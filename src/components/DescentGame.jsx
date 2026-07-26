"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

/*
 * DESCENT: the portfolio's game mode.
 * A procedurally generated loss landscape, different every run. Your model
 * (the ball) runs gradient descent on its own; you control ONE thing, the
 * learning rate. Too low and you crawl or get trapped in a local minimum;
 * too high and the gradient explodes. Converge at the GLOBAL minimum in as
 * few steps as you can. ↑/↓ tune the LR, SPACE kicks you out of a trap
 * (costs 50 steps). Best run saved locally.
 */

const STEP_DT = 1 / 30;        // one optimizer step per tick
const LR_MIN = 0.0004;
const LR_MAX = 0.6;
const LR_START = 0.01;
const CONVERGE_EPS = 0.00035;  // |lr * grad| below this counts as converged
const CONVERGE_TICKS = 45;
const KICK_COST = 50;

const clamp = (v, a, b) => Math.max(a, Math.min(b, v));

// a loss landscape: gentle bowl + 4-6 gaussian dips, one deepest (the global min)
function makeLandscape() {
  const dips = [];
  const n = 4 + Math.floor(Math.random() * 3);
  for (let i = 0; i < n; i++) {
    dips.push({
      m: 0.08 + Math.random() * 0.84,
      d: 0.16 + Math.random() * 0.3,
      s: 0.025 + Math.random() * 0.04,
    });
  }
  dips[Math.floor(Math.random() * n)].d = 0.55 + Math.random() * 0.2; // the prize

  const raw = (x) => {
    let v = 0.6 * (x - 0.5) * (x - 0.5);
    for (const g of dips) v -= g.d * Math.exp(-((x - g.m) ** 2) / (2 * g.s * g.s));
    return v;
  };
  const rawGrad = (x) => {
    let g = 1.2 * (x - 0.5);
    for (const q of dips) {
      g += q.d * ((x - q.m) / (q.s * q.s)) * Math.exp(-((x - q.m) ** 2) / (2 * q.s * q.s));
    }
    return g;
  };

  // normalize f to [0, 1] over the play range, find the global minimum
  let fMin = Infinity, fMax = -Infinity, gxMin = 0.5;
  for (let i = 0; i <= 600; i++) {
    const x = i / 600;
    const v = raw(x);
    if (v < fMin) { fMin = v; gxMin = x; }
    if (v > fMax) fMax = v;
  }
  const span = fMax - fMin || 1;
  return {
    f: (x) => (raw(x) - fMin) / span,
    grad: (x) => rawGrad(x) / span,
    gxMin,
  };
}

export default function DescentGame() {
  const [open, setOpen] = useState(false);
  const [steps, setSteps] = useState(0);
  const [best, setBest] = useState(null);
  const [phase, setPhase] = useState("idle"); // idle | running | converged | local | exploded
  const canvasRef = useRef(null);
  const game = useRef(null);

  useEffect(() => {
    const b = localStorage.getItem("bsp-descent-best");
    setBest(b ? Number(b) : null);
  }, []);

  const chime = useCallback((kind) => {
    const g = game.current;
    if (!g) return;
    try {
      if (!g.audio) g.audio = new (window.AudioContext || window.webkitAudioContext)();
      const ctx = g.audio;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.connect(gain); gain.connect(ctx.destination);
      osc.frequency.value = kind === "win" ? 1320 : kind === "kick" ? 700 : kind === "local" ? 500 : 130;
      osc.type = kind === "explode" ? "sawtooth" : "sine";
      const t0 = ctx.currentTime;
      gain.gain.setValueAtTime(kind === "explode" ? 0.08 : 0.06, t0);
      gain.gain.exponentialRampToValueAtTime(0.0001, t0 + (kind === "explode" ? 0.4 : 0.2));
      osc.start(t0); osc.stop(t0 + 0.45);
    } catch { /* audio is garnish */ }
  }, []);

  const newRun = useCallback(() => {
    const g = game.current;
    if (!g) return;
    g.land = makeLandscape();
    g.x = 0.04 + Math.random() * 0.12; // drop in on the left slope
    g.lr = LR_START;
    g.steps = 0;
    g.calm = 0;
    g.trail = [];
    g.sparks = [];
    g.msgs = [];
    g.phase = "running";
    setPhase("running");
    setSteps(0);
  }, []);

  const finishRun = useCallback((g) => {
    const atGlobal = Math.abs(g.x - g.land.gxMin) < 0.03;
    g.phase = atGlobal ? "converged" : "local";
    setPhase(g.phase);
    if (atGlobal) {
      chime("win");
      g.msgs.push({ text: "converged.", color: "#E8D5B5", born: performance.now() });
      if (best === null || g.steps < best) {
        setBest(g.steps);
        localStorage.setItem("bsp-descent-best", String(g.steps));
      }
    } else {
      chime("local");
      g.msgs.push({ text: "local minimum…", color: "#C9A87C", born: performance.now() });
    }
  }, [best, chime]);

  const kick = useCallback(() => {
    const g = game.current;
    if (!g) return;
    if (g.phase === "idle" || g.phase === "converged" || g.phase === "exploded") { newRun(); return; }
    // a momentum kick out of the trap: costs steps
    g.x = clamp(g.x + (Math.random() < 0.5 ? -1 : 1) * (0.1 + Math.random() * 0.1), 0.02, 0.98);
    g.steps += KICK_COST;
    g.calm = 0;
    if (g.phase === "local") { g.phase = "running"; setPhase("running"); }
    setSteps(g.steps);
    chime("kick");
    g.msgs.push({ text: `+${KICK_COST} steps`, color: "#B4552D", born: performance.now() });
  }, [newRun, chime]);

  const nudgeLr = useCallback((up) => {
    const g = game.current;
    if (!g || g.phase !== "running") return;
    g.lr = clamp(g.lr * (up ? 1.18 : 1 / 1.18), LR_MIN, LR_MAX);
  }, []);

  useEffect(() => {
    if (!open) return;
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const W = Math.max(300, Math.min(560, window.innerWidth - 56));
    const H = Math.max(300, Math.min(420, Math.floor(window.innerHeight * 0.5)));
    canvas.width = W * dpr; canvas.height = H * dpr;
    canvas.style.width = W + "px"; canvas.style.height = H + "px";
    ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

    game.current = {
      land: makeLandscape(), x: 0.1, lr: LR_START, steps: 0, calm: 0,
      trail: [], sparks: [], msgs: [], phase: "idle", audio: null, acc: 0,
    };
    setPhase("idle"); setSteps(0);

    const PAD = 26;
    const plotX = (x) => PAD + x * (W - PAD * 2);
    const plotY = (v) => H - 46 - v * (H - 96);

    let raf, lastT = 0;
    const draw = (t) => {
      const g = game.current;
      if (!g) return;
      const dt = Math.min(0.05, lastT ? (t - lastT) / 1000 : 0.016);
      lastT = t;
      const now = performance.now();
      ctx.clearRect(0, 0, W, H);

      // ——— physics: fixed-cadence optimizer steps ———
      if (g.phase === "running") {
        g.acc += dt;
        while (g.acc >= STEP_DT) {
          g.acc -= STEP_DT;
          const gr = g.land.grad(g.x);
          const move = g.lr * gr;
          g.x -= move;
          g.steps++;
          if (g.x < -0.12 || g.x > 1.12) {
            g.phase = "exploded";
            setPhase("exploded");
            chime("explode");
            for (let i = 0; i < 26; i++) {
              const a = Math.random() * Math.PI * 2;
              const sp = 40 + Math.random() * 130;
              g.sparks.push({ x: plotX(clamp(g.x, 0, 1)), y: plotY(0.5),
                vx: Math.cos(a) * sp, vy: Math.sin(a) * sp - 40, life: 1 });
            }
            g.msgs.push({ text: "gradient exploded 💥", color: "#B4552D", born: now });
            break;
          }
          if (Math.abs(move) < CONVERGE_EPS) {
            g.calm++;
            if (g.calm >= CONVERGE_TICKS) { finishRun(g); break; }
          } else {
            g.calm = 0;
          }
        }
        if (g.steps !== 0 && g.steps % 5 === 0) setSteps(g.steps);
      }

      // ——— the landscape ———
      ctx.lineJoin = "round";
      ctx.beginPath();
      for (let i = 0; i <= 240; i++) {
        const x = i / 240;
        const px = plotX(x), py = plotY(g.land.f(x));
        if (i === 0) ctx.moveTo(px, py); else ctx.lineTo(px, py);
      }
      // glow pass + core pass
      ctx.strokeStyle = "rgba(201,168,124,0.14)";
      ctx.lineWidth = 6;
      ctx.stroke();
      ctx.strokeStyle = "rgba(201,168,124,0.75)";
      ctx.lineWidth = 1.6;
      ctx.stroke();

      // faint fill under the curve
      ctx.lineTo(plotX(1), H - 20);
      ctx.lineTo(plotX(0), H - 20);
      ctx.closePath();
      ctx.fillStyle = "rgba(201,168,124,0.045)";
      ctx.fill();

      // global minimum: revealed only after the run ends
      if (g.phase === "converged" || g.phase === "local" || g.phase === "exploded") {
        const mx = plotX(g.land.gxMin), my = plotY(g.land.f(g.land.gxMin));
        ctx.strokeStyle = "rgba(232,213,181,0.5)";
        ctx.setLineDash([2, 5]);
        ctx.beginPath();
        ctx.moveTo(mx, my + 6);
        ctx.lineTo(mx, H - 24);
        ctx.stroke();
        ctx.setLineDash([]);
        ctx.fillStyle = "rgba(232,213,181,0.75)";
        ctx.font = "9px monospace";
        ctx.textAlign = "center";
        ctx.fillText("GLOBAL MIN", mx, H - 12);
      }

      if (g.phase !== "exploded") {
        // ——— the model (ball) + trail ———
        const bx = plotX(clamp(g.x, 0, 1));
        const by = plotY(g.land.f(clamp(g.x, 0, 1)));
        g.trail.push({ x: bx, y: by });
        if (g.trail.length > 44) g.trail.shift();
        for (let i = 1; i < g.trail.length; i++) {
          const f = i / g.trail.length;
          ctx.strokeStyle = `rgba(232,213,181,${f * f * 0.35})`;
          ctx.lineWidth = f * 2;
          ctx.beginPath();
          ctx.moveTo(g.trail[i - 1].x, g.trail[i - 1].y);
          ctx.lineTo(g.trail[i].x, g.trail[i].y);
          ctx.stroke();
        }
        const won = g.phase === "converged";
        ctx.fillStyle = won ? "rgba(232,213,181,1)" : "rgba(242,237,227,0.95)";
        ctx.shadowColor = "rgba(201,168,124,0.9)";
        ctx.shadowBlur = won ? 18 : 10;
        ctx.beginPath();
        ctx.arc(bx, by - 5, 5, 0, Math.PI * 2);
        ctx.fill();
        ctx.shadowBlur = 0;
      }

      // ——— learning-rate gauge ———
      const lrFrac = (Math.log(g.lr) - Math.log(LR_MIN)) / (Math.log(LR_MAX) - Math.log(LR_MIN));
      ctx.fillStyle = "rgba(201,168,124,0.15)";
      ctx.fillRect(PAD, 14, W - PAD * 2, 3);
      ctx.fillStyle = lrFrac > 0.82 ? "rgba(180,85,45,0.95)" : "rgba(201,168,124,0.9)";
      ctx.fillRect(PAD, 14, (W - PAD * 2) * lrFrac, 3);
      ctx.fillStyle = "rgba(143,133,122,0.9)";
      ctx.font = "9px monospace";
      ctx.textAlign = "left";
      ctx.fillText(`LR ${g.lr.toFixed(4)}${lrFrac > 0.82 ? "  ⚠ UNSTABLE" : ""}`, PAD, 30);
      ctx.textAlign = "right";
      ctx.fillText(`LOSS ${g.land.f(clamp(g.x, 0, 1)).toFixed(3)}`, W - PAD, 30);

      // ——— sparks (explosions) ———
      g.sparks = g.sparks.filter((s) => s.life > 0);
      for (const s of g.sparks) {
        s.life -= dt * 1.1;
        s.x += s.vx * dt;
        s.y += s.vy * dt;
        s.vy += 160 * dt;
        ctx.fillStyle = `rgba(232,140,90,${Math.max(0, s.life) * 0.85})`;
        ctx.beginPath();
        ctx.arc(s.x, s.y, 1.6, 0, Math.PI * 2);
        ctx.fill();
      }

      // ——— floating messages ———
      g.msgs = g.msgs.filter((m) => now - m.born < 1400);
      for (const m of g.msgs) {
        const p = (now - m.born) / 1400;
        ctx.globalAlpha = 1 - p;
        ctx.fillStyle = m.color;
        ctx.font = "italic 20px Georgia, serif";
        ctx.textAlign = "center";
        ctx.fillText(m.text, W / 2, 64 - p * 20);
        ctx.globalAlpha = 1;
      }

      // ——— state prompts ———
      ctx.fillStyle = "rgba(143,133,122,0.9)";
      ctx.font = "10px monospace";
      ctx.textAlign = "center";
      if (g.phase === "idle") ctx.fillText("PRESS SPACE · OR TAP · TO DROP YOUR MODEL", W / 2, H / 2);
      if (g.phase === "converged") ctx.fillText(`CONVERGED IN ${g.steps} STEPS · SPACE FOR A NEW LANDSCAPE`, W / 2, 48);
      if (g.phase === "local") ctx.fillText("TRAPPED · SPACE TO KICK OUT (+50) · OR RAISE THE LR", W / 2, 48);
      if (g.phase === "exploded") ctx.fillText(`EXPLODED AFTER ${g.steps} STEPS · SPACE TO TRY AGAIN`, W / 2, 48);

      raf = requestAnimationFrame(draw);
    };

    const onKey = (e) => {
      if (e.key === "Escape") { setOpen(false); return; }
      if (e.key === "ArrowUp") { e.preventDefault(); nudgeLr(true); }
      if (e.key === "ArrowDown") { e.preventDefault(); nudgeLr(false); }
      if (e.code === "Space" || e.key === "Enter") { e.preventDefault(); kick(); }
    };
    const onPointer = (e) => { e.preventDefault(); kick(); };

    raf = requestAnimationFrame(draw);
    window.addEventListener("keydown", onKey);
    canvas.addEventListener("pointerdown", onPointer);
    document.body.style.overflow = "hidden";
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      canvas.removeEventListener("pointerdown", onPointer);
      document.body.style.overflow = "";
      game.current?.audio?.close?.().catch?.(() => {});
      game.current = null;
    };
  }, [open, kick, nudgeLr, finishRun, chime]);

  const HudBtn = ({ label, onPress, aria }) => (
    <button data-hover aria-label={aria}
      onPointerDown={(e) => { e.preventDefault(); e.stopPropagation(); onPress(); }}
      style={{ minWidth: 44, minHeight: 40, borderRadius: 2, border: "1px solid var(--hairline)",
        background: "rgba(201,168,124,0.05)", color: "var(--gold)", fontFamily: "var(--mono)",
        fontSize: "0.7rem", cursor: "pointer", touchAction: "none", padding: "0 0.7rem" }}>
      {label}
    </button>
  );

  return (
    <>
      <button data-hover onClick={() => setOpen(true)} className="numeral" aria-haspopup="dialog"
        style={{ letterSpacing: "0.22em", cursor: "pointer", color: "var(--faint)",
          transition: "color 0.3s", background: "none", border: "none", padding: "0.4rem 0", font: "inherit" }}
        onMouseEnter={(e) => (e.target.style.color = "var(--gold)")}
        onMouseLeave={(e) => (e.target.style.color = "var(--faint)")}>
        ◉ PLAY DESCENT · A LEARNING-RATE GAME
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }} onClick={() => setOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 60,
              background: "rgba(12,9,6,0.92)", backdropFilter: "blur(10px)", WebkitBackdropFilter: "blur(10px)",
              display: "flex", alignItems: "center", justifyContent: "center", padding: "clamp(1rem, 4vw, 3rem)" }}>
            <motion.div role="dialog" aria-modal="true" aria-label="Descent, a learning rate game"
              initial={{ opacity: 0, y: 40, scale: 0.97 }} animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }} transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{ background: "var(--surface)", border: "1px solid var(--hairline)", borderRadius: 2,
                padding: "clamp(1.2rem, 3vw, 2rem)", maxWidth: "100%" }}>

              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                gap: "1.5rem", marginBottom: "1.1rem", flexWrap: "wrap" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "0.9rem" }}>
                  <div style={{ width: 30, height: 1, background: "linear-gradient(to right, var(--gold), transparent)" }} />
                  <span className="label" style={{ color: "var(--gold)" }}>Descent · find the global minimum</span>
                </div>
                <div style={{ display: "flex", gap: "1.3rem", alignItems: "baseline" }}>
                  <span className="numeral">STEPS <span style={{ color: "var(--cream)" }}>{steps}</span></span>
                  <span className="numeral">BEST <span style={{ color: "var(--gold)" }}>{best === null ? "···" : best}</span></span>
                  <button data-hover onClick={() => setOpen(false)} className="numeral" aria-label="Close game"
                    style={{ cursor: "pointer", color: "var(--muted)", background: "none", border: "none", font: "inherit", padding: "0.2rem" }}
                    onMouseEnter={(e) => (e.target.style.color = "var(--gold)")}
                    onMouseLeave={(e) => (e.target.style.color = "var(--muted)")}>✕</button>
                </div>
              </div>

              <canvas ref={canvasRef} style={{ display: "block", borderRadius: 2,
                border: "1px solid var(--hairline)", touchAction: "none", cursor: "pointer" }} />

              {/* touch controls */}
              <div style={{ display: "flex", justifyContent: "center", gap: "0.6rem", marginTop: "0.8rem" }}>
                <HudBtn label="LR −" aria="Lower the learning rate" onPress={() => nudgeLr(false)} />
                <HudBtn label={phase === "running" ? "KICK" : "DROP"} aria="Kick or start"
                  onPress={kick} />
                <HudBtn label="LR +" aria="Raise the learning rate" onPress={() => nudgeLr(true)} />
              </div>

              <p className="numeral" style={{ marginTop: "0.8rem", textAlign: "center", letterSpacing: "0.16em" }}>
                ↑ ↓ TUNE THE LEARNING RATE · SPACE TO KICK OUT OF A TRAP · LOWEST STEPS WINS
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
