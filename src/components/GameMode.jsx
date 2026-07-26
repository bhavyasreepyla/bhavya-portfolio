"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef, useCallback } from "react";

/*
 * CAREER.EXE: the site's headline game mode.
 * A green-on-black pixel platformer over eight real milestones. The player
 * jumps hurdles labeled with actual career/dance beats; hitting one doesn't
 * fail the run, it just cuts to a meme and moves the player past it. The
 * run always ends at the OFFER flag with employability 100/100 — the
 * game is rigged in her favor on purpose.
 */

const CANVAS_W = 480;
const CANVAS_H = 270;
const GROUND_Y = 210;
const PLAYER_SCREEN_X = 90;
const PLAYER_W = 14;
const PLAYER_H = 20;

const WORLD_SPEED = 115; // px/s
const GRAVITY = 640; // px/s^2
const JUMP_VY = -265; // px/s
const JUMP_BUFFER_MS = 90;

const OBSTACLE_START_X = 520;
const OBSTACLE_SPACING = 430;
const FLAG_OFFSET = 420;

const OBSTACLE_DEFS = [
  { label: "HIGH SCHOOL GRAD", w: 22, h: 26 },
  { label: "B.TECH AI · MAHINDRA", w: 24, h: 30 },
  { label: "NUS INTERNSHIP", w: 26, h: 28 },
  { label: "RUBUS INTERNSHIP", w: 24, h: 32 },
  { label: "RUBUS, ROUND 2", w: 28, h: 34 },
  { label: "MS AI · NORTHEASTERN", w: 26, h: 36 },
  { label: "RA · BIOMEDICINE VLMs", w: 30, h: 38 },
];

const MEMES = [
  { art: "¯\\_(ツ)_/¯", caption: "tripped. character development." },
  { art: "(╯°□°)╯︵ ┻━┻", caption: "loss: NaN. flipping the table." },
  { art: "(x_x)", caption: "segfault (emotionally). rebooting…" },
  { art: "(ಥ﹏ಥ)", caption: "404: sleep not found." },
  { art: "(⌐■_■)", caption: "we move." },
];

// 8-wide x 11-tall pixel maps. "." empty, "#" body (#00ff66), "@" hair-bun (#aaffcc).
const HEAD_TORSO = [
  "..@@....",
  "..####..",
  "..####..",
  ".######.",
  ".######.",
  ".######.",
  ".######.",
  "..####..",
];
const PLAYER_FRAMES = {
  runA: [...HEAD_TORSO, ".##..##.", "##...##.", "#.....##"],
  runB: [...HEAD_TORSO, ".##..##.", ".##...##", "##.....#"],
  jump: [...HEAD_TORSO, "..####..", ".##..##.", "........"],
};

function createGameState() {
  const obstacles = OBSTACLE_DEFS.map((o, i) => ({
    ...o,
    x: OBSTACLE_START_X + i * OBSTACLE_SPACING,
    resolved: false,
  }));
  const last = obstacles[obstacles.length - 1];
  return {
    worldX: 0,
    playerOffsetY: 0,
    vy: 0,
    grounded: true,
    jumpBufferedAt: -Infinity,
    runFrameIdx: 0,
    runFrameTimer: 0,
    obstacles,
    flagX: last.x + FLAG_OFFSET,
    reachedFlag: false,
    memeObstacle: null,
    memeStartedAt: 0,
    hitTotal: 0,
    checkmarks: [],
    audio: null,
  };
}

function drawPlayer(ctx, screenX, feetY, frameMap) {
  const cell = 2;
  const x0 = screenX - 8;
  const y0 = feetY - 11 * cell;
  for (let ry = 0; ry < 11; ry++) {
    const row = frameMap[ry];
    for (let cx = 0; cx < 8; cx++) {
      const ch = row[cx];
      if (ch === ".") continue;
      ctx.fillStyle = ch === "@" ? "#aaffcc" : "#00ff66";
      ctx.fillRect(x0 + cx * cell, y0 + ry * cell, cell, cell);
    }
  }
}

function drawHurdle(ctx, left, top, w, h, label, resolved) {
  ctx.strokeStyle = resolved ? "rgba(0,255,102,0.35)" : "#00ff66";
  ctx.lineWidth = 1;
  ctx.strokeRect(left + 0.5, top + 0.5, w, h);
  ctx.save();
  ctx.beginPath();
  ctx.rect(left, top, w, h);
  ctx.clip();
  ctx.strokeStyle = "rgba(0,255,102,0.4)";
  for (let hx = left - h; hx < left + w; hx += 6) {
    ctx.beginPath();
    ctx.moveTo(hx, top + h);
    ctx.lineTo(hx + h, top);
    ctx.stroke();
  }
  ctx.restore();
  ctx.fillStyle = "rgba(0,255,102,0.7)";
  ctx.font = "7px monospace";
  ctx.textAlign = "center";
  ctx.fillText(label, left + w / 2, top - 4);
}

function drawFlag(ctx, x, now) {
  const wave = Math.sin(now / 200) * 3;
  ctx.strokeStyle = "#00ff66";
  ctx.lineWidth = 2;
  ctx.beginPath();
  ctx.moveTo(x, GROUND_Y);
  ctx.lineTo(x, GROUND_Y - 50);
  ctx.stroke();
  ctx.beginPath();
  ctx.moveTo(x, GROUND_Y - 50);
  ctx.lineTo(x + 18 + wave, GROUND_Y - 44);
  ctx.lineTo(x, GROUND_Y - 38);
  ctx.closePath();
  ctx.fillStyle = "#00ff66";
  ctx.fill();
  ctx.fillStyle = "#aaffcc";
  ctx.font = "7px monospace";
  ctx.textAlign = "center";
  ctx.fillText("OFFER", x, GROUND_Y - 56);
}

function renderScene(ctx, g, phase, now) {
  ctx.clearRect(0, 0, CANVAS_W, CANVAS_H);

  // parallax stars/plus-signs, half speed
  const starSpacing = 46;
  const starOffset = (g.worldX * 0.5) % starSpacing;
  for (let i = -1; i * starSpacing - starOffset < CANVAS_W + starSpacing; i++) {
    const sx = i * starSpacing - starOffset;
    const hash = Math.abs(Math.sin(i * 12.9898) * 43758.5453) % 1;
    if (hash > 0.55) continue;
    const sy = 14 + hash * 70;
    ctx.fillStyle = "rgba(0,255,102,0.25)";
    ctx.font = "8px monospace";
    ctx.fillText(hash > 0.3 ? "+" : ".", sx, sy);
  }

  // dim skyline, quarter speed
  const skySpacing = 90;
  const skyOffset = (g.worldX * 0.25) % skySpacing;
  for (let i = -1; i * skySpacing - skyOffset < CANVAS_W + skySpacing; i++) {
    const sx = i * skySpacing - skyOffset;
    const hash = Math.abs(Math.sin((i + 100) * 7.233) * 10000) % 1;
    const h = 20 + hash * 50;
    const w = 24 + ((i * 13) % 20);
    ctx.fillStyle = "rgba(0,255,102,0.08)";
    ctx.fillRect(sx, GROUND_Y - h, w, h);
  }

  // ground line
  ctx.strokeStyle = "#00ff66";
  ctx.lineWidth = 1;
  ctx.beginPath();
  ctx.moveTo(0, GROUND_Y + 0.5);
  ctx.lineTo(CANVAS_W, GROUND_Y + 0.5);
  ctx.stroke();

  // tick marks, scrolling
  const tickSpacing = 40;
  const tickOffset = g.worldX % tickSpacing;
  ctx.strokeStyle = "rgba(0,255,102,0.4)";
  for (let sx = -tickOffset; sx < CANVAS_W; sx += tickSpacing) {
    ctx.beginPath();
    ctx.moveTo(sx, GROUND_Y + 2);
    ctx.lineTo(sx, GROUND_Y + 7);
    ctx.stroke();
  }

  if (phase === "running" || phase === "meme" || phase === "scoring") {
    for (const o of g.obstacles) {
      const hLeft = o.x - g.worldX;
      if (hLeft > CANVAS_W + 40 || hLeft + o.w < -40) continue;
      drawHurdle(ctx, hLeft, GROUND_Y - o.h, o.w, o.h, o.label, o.resolved);
    }

    const flagScreenX = g.flagX - g.worldX;
    if (flagScreenX > -60 && flagScreenX < CANVAS_W + 60) {
      drawFlag(ctx, flagScreenX, now);
    }

    const feetY = GROUND_Y + g.playerOffsetY;
    const frame = !g.grounded
      ? PLAYER_FRAMES.jump
      : g.runFrameIdx === 0
      ? PLAYER_FRAMES.runA
      : PLAYER_FRAMES.runB;
    drawPlayer(ctx, PLAYER_SCREEN_X, feetY, frame);

    g.checkmarks = g.checkmarks.filter((c) => now - c.startedAt < 600);
    for (const c of g.checkmarks) {
      const age = now - c.startedAt;
      const p = age / 600;
      ctx.globalAlpha = 1 - p;
      ctx.fillStyle = "#aaffcc";
      ctx.font = "10px monospace";
      ctx.textAlign = "center";
      ctx.fillText("✓", PLAYER_SCREEN_X, c.feetYAtSpawn - PLAYER_H - 4 - p * 10);
      ctx.globalAlpha = 1;
    }
  }
}

function BootScreen({ text }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center",
      justifyContent: "center", background: "#000" }}>
      <pre style={{ fontFamily: "var(--mono), monospace", fontSize: "1.1rem", color: "#00ff66",
        margin: 0, textShadow: "0 0 8px rgba(0,255,102,0.6)" }}>
        {text}
        <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.9, repeat: Infinity }}>▂</motion.span>
      </pre>
    </div>
  );
}

function TitleScreen({ onStart }) {
  return (
    <div role="button" tabIndex={0} onClick={onStart}
      style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: "0.9rem", cursor: "pointer",
        background: "rgba(0,0,0,0.6)", textAlign: "center", padding: "1rem" }}>
      <h2 style={{ fontSize: "clamp(2rem, 6vw, 3.5rem)", letterSpacing: "0.2em", color: "#00ff66",
        margin: 0, textShadow: "0 0 8px rgba(0,255,102,0.6)" }}>CAREER.EXE</h2>
      <p style={{ color: "rgba(0,255,102,0.7)", fontSize: "0.8rem", letterSpacing: "0.14em",
        margin: 0, textShadow: "0 0 8px rgba(0,255,102,0.6)" }}>
        A 100% UNBIASED EMPLOYABILITY SIMULATION
      </p>
      <p style={{ color: "rgba(0,255,102,0.5)", fontSize: "0.7rem", letterSpacing: "0.1em",
        margin: 0, textShadow: "0 0 8px rgba(0,255,102,0.6)" }}>
        SPACE / TAP TO JUMP · CLEAR THE MILESTONES · REACH THE OFFER
      </p>
      <motion.p animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1.1, repeat: Infinity, ease: "easeInOut" }}
        style={{ color: "#aaffcc", fontSize: "0.85rem", letterSpacing: "0.16em", margin: 0,
          textShadow: "0 0 8px rgba(0,255,102,0.6)" }}>
        ▸ PRESS SPACE TO START
      </motion.p>
    </div>
  );
}

function MemeScreen({ meme }) {
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: "0.6rem", background: "rgba(0,0,0,0.72)" }}>
      <pre style={{ fontFamily: "var(--mono), monospace", fontSize: "1.6rem", color: "#00ff66",
        margin: 0, textShadow: "0 0 8px rgba(0,255,102,0.6)" }}>{meme.art}</pre>
      <p style={{ fontSize: "0.8rem", color: "rgba(0,255,102,0.6)", letterSpacing: "0.06em",
        margin: 0, textShadow: "0 0 8px rgba(0,255,102,0.6)" }}>{meme.caption}</p>
    </div>
  );
}

function ScoringScreen({ stage, score, onPlayAgain, onReturn }) {
  const filled = Math.round((score / 100) * 20);
  const bar = "[" + "█".repeat(filled) + "░".repeat(20 - filled) + "]";
  return (
    <div style={{ position: "absolute", inset: 0, display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", gap: "0.7rem", background: "rgba(0,0,0,0.85)",
      padding: "1rem", textAlign: "center" }}>
      {stage >= 0 && (
        <p style={{ margin: 0, color: "#00ff66", letterSpacing: "0.1em",
          textShadow: "0 0 8px rgba(0,255,102,0.6)" }}>RUN COMPLETE.</p>
      )}
      {stage >= 1 && (
        <p style={{ margin: 0, color: "rgba(0,255,102,0.7)", letterSpacing: "0.1em",
          textShadow: "0 0 8px rgba(0,255,102,0.6)" }}>CALCULATING EMPLOYABILITY…</p>
      )}
      {stage >= 2 && (
        <div style={{ display: "flex", flexDirection: "column", gap: "0.3rem" }}>
          <p style={{ margin: 0, color: "#00ff66", fontSize: "1rem", letterSpacing: "0.08em",
            textShadow: "0 0 8px rgba(0,255,102,0.6)" }}>
            EMPLOYABILITY SCORE: {score}/100
          </p>
          <p style={{ margin: 0, color: "#00ff66", fontSize: "0.85rem",
            textShadow: "0 0 8px rgba(0,255,102,0.6)" }}>{bar}</p>
        </div>
      )}
      {stage >= 3 && (
        <>
          <motion.p animate={{ opacity: [1, 0.3, 1] }} transition={{ duration: 1, repeat: Infinity, ease: "easeInOut" }}
            style={{ margin: 0, color: "#aaffcc", letterSpacing: "0.18em", fontSize: "0.9rem",
              textShadow: "0 0 8px rgba(0,255,102,0.6)" }}>
            CHOOSE ME. HIRE ME. PAY ME.
          </motion.p>
          <div style={{ display: "flex", gap: "0.8rem", marginTop: "0.6rem", flexWrap: "wrap", justifyContent: "center" }}>
            <button data-hover onClick={onPlayAgain}
              style={{ minHeight: 44, border: "1px solid #00ff66", background: "none", color: "#00ff66",
                fontFamily: "var(--mono), monospace", cursor: "pointer", padding: "0 1rem",
                textShadow: "0 0 8px rgba(0,255,102,0.6)" }}>▸ PLAY AGAIN</button>
            <button data-hover onClick={onReturn}
              style={{ minHeight: 44, border: "1px solid #00ff66", background: "none", color: "#00ff66",
                fontFamily: "var(--mono), monospace", cursor: "pointer", padding: "0 1rem",
                textShadow: "0 0 8px rgba(0,255,102,0.6)" }}>▸ RETURN TO PORTFOLIO</button>
          </div>
        </>
      )}
    </div>
  );
}

function ScanlineOverlay({ reducedMotion }) {
  return (
    <motion.div aria-hidden
      animate={reducedMotion ? undefined : { opacity: [1, 0.88, 1, 0.93, 1] }}
      transition={reducedMotion ? undefined : { duration: 4, repeat: Infinity, ease: "easeInOut" }}
      style={{
        position: "absolute", inset: 0, zIndex: 50, pointerEvents: "none",
        background: "radial-gradient(ellipse at center, transparent 60%, rgba(0,0,0,0.5) 100%), repeating-linear-gradient(0deg, transparent 0px, transparent 2px, rgba(0,0,0,0.3) 2px, rgba(0,0,0,0.3) 4px)",
      }} />
  );
}

export default function GameMode() {
  const [open, setOpen] = useState(false);
  const [phase, setPhase] = useState("boot"); // boot | title | running | meme | scoring
  const [bootText, setBootText] = useState("");
  const [milestones, setMilestones] = useState(0);
  const [memeIndex, setMemeIndex] = useState(0);
  const [scoreStage, setScoreStage] = useState(0);
  const [score, setScore] = useState(0);
  const [reducedMotion, setReducedMotion] = useState(false);

  const canvasRef = useRef(null);
  const game = useRef(null);
  const phaseRef = useRef("boot");

  useEffect(() => {
    phaseRef.current = phase;
  }, [phase]);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setReducedMotion(mq.matches);
    const handler = (e) => setReducedMotion(e.matches);
    mq.addEventListener?.("change", handler);
    return () => mq.removeEventListener?.("change", handler);
  }, []);

  const chime = useCallback((kind) => {
    const g = game.current;
    if (!g || !g.audio) return;
    try {
      const ctx = g.audio;
      const tone = (freq, durMs, delaySec = 0) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = "square";
        osc.frequency.value = freq;
        osc.connect(gain);
        gain.connect(ctx.destination);
        const t0 = ctx.currentTime + delaySec;
        gain.gain.setValueAtTime(0.05, t0);
        gain.gain.exponentialRampToValueAtTime(0.0001, t0 + durMs / 1000);
        osc.start(t0);
        osc.stop(t0 + durMs / 1000 + 0.02);
      };
      if (kind === "jump") tone(440, 90);
      else if (kind === "hit") tone(110, 220);
      else if (kind === "clear") tone(880, 70);
      else if (kind === "win") {
        tone(660, 90, 0);
        tone(880, 90, 0.09);
        tone(1320, 140, 0.18);
      }
    } catch { /* audio is garnish */ }
  }, []);

  const openGame = useCallback(() => {
    phaseRef.current = "boot";
    setPhase("boot");
    setOpen(true);
  }, []);

  const closeGame = useCallback(() => {
    setOpen(false);
  }, []);

  const startRun = useCallback(() => {
    const prevAudio = game.current?.audio || null;
    const fresh = createGameState();
    fresh.audio = prevAudio;
    game.current = fresh;
    phaseRef.current = "running";
    setPhase("running");
    setMilestones(0);
    setMemeIndex(0);
  }, []);

  // boot: typewriter, then auto-advance to title
  useEffect(() => {
    if (!open || phase !== "boot") return;
    const full = "> boot career.exe";
    if (reducedMotion) {
      setBootText(full);
      const t = setTimeout(() => {
        phaseRef.current = "title";
        setPhase("title");
      }, 200);
      return () => clearTimeout(t);
    }
    setBootText("");
    let i = 0;
    const iv = setInterval(() => {
      i += 1;
      setBootText(full.slice(0, i));
      if (i >= full.length) clearInterval(iv);
    }, 38);
    const done = setTimeout(() => {
      phaseRef.current = "title";
      setPhase("title");
    }, full.length * 38 + 320);
    return () => {
      clearInterval(iv);
      clearTimeout(done);
    };
  }, [open, phase, reducedMotion]);

  // scoring: sequence the typewriter lines then start the counter
  useEffect(() => {
    if (!open || phase !== "scoring") return;
    setScoreStage(0);
    setScore(0);
    const t1 = setTimeout(() => setScoreStage(1), reducedMotion ? 80 : 500);
    const t2 = setTimeout(() => setScoreStage(2), reducedMotion ? 160 : 1400);
    return () => {
      clearTimeout(t1);
      clearTimeout(t2);
    };
  }, [open, phase, reducedMotion]);

  // scoring: the 0->100 counter, always lands on exactly 100
  useEffect(() => {
    if (!open || phase !== "scoring" || scoreStage !== 2) return;
    if (reducedMotion) {
      setScore(100);
      chime("win");
      const t = setTimeout(() => setScoreStage(3), 120);
      return () => clearTimeout(t);
    }
    let raf;
    const start = performance.now();
    const duration = 1600;
    const tick = (t) => {
      const p = Math.min(1, (t - start) / duration);
      const eased = 1 - Math.pow(1 - p, 3);
      setScore(Math.round(eased * 100));
      if (p < 1) {
        raf = requestAnimationFrame(tick);
      } else {
        setScore(100);
        chime("win");
        setScoreStage(3);
      }
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [open, phase, scoreStage, reducedMotion, chime]);

  // canvas setup, input, and the persistent rAF loop for the whole session
  useEffect(() => {
    if (!open) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    canvas.width = CANVAS_W;
    canvas.height = CANVAS_H;
    ctx.imageSmoothingEnabled = false;

    if (!game.current) game.current = createGameState();

    const ensureAudio = () => {
      const g = game.current;
      if (!g || g.audio) return;
      try {
        g.audio = new (window.AudioContext || window.webkitAudioContext)();
      } catch { /* audio is garnish */ }
    };

    const requestJump = () => {
      if (phaseRef.current !== "running") return;
      game.current.jumpBufferedAt = performance.now();
    };

    const onKey = (e) => {
      if (e.key === "Escape") {
        closeGame();
        return;
      }
      ensureAudio();
      if (phaseRef.current === "title" && (e.code === "Space" || e.key === "Enter")) {
        e.preventDefault();
        startRun();
        return;
      }
      if (phaseRef.current === "running" && (e.code === "Space" || e.key === "ArrowUp")) {
        e.preventDefault();
        requestJump();
      }
    };
    const onPointerDown = () => {
      ensureAudio();
      if (phaseRef.current === "running") requestJump();
    };

    window.addEventListener("keydown", onKey);
    canvas.addEventListener("pointerdown", onPointerDown);
    document.body.style.overflow = "hidden";

    let raf;
    let lastT = 0;

    const draw = (t) => {
      const g = game.current;
      if (!g) return;
      const dt = Math.min(0.05, lastT ? (t - lastT) / 1000 : 0.016);
      lastT = t;
      const now = performance.now();

      if (phaseRef.current === "running") {
        g.worldX += WORLD_SPEED * dt;

        if (g.grounded && now - g.jumpBufferedAt <= JUMP_BUFFER_MS) {
          g.vy = JUMP_VY;
          g.grounded = false;
          g.jumpBufferedAt = -Infinity;
          chime("jump");
        }
        g.vy += GRAVITY * dt;
        g.playerOffsetY += g.vy * dt;
        if (g.playerOffsetY >= 0) {
          g.playerOffsetY = 0;
          g.vy = 0;
          g.grounded = true;
        } else {
          g.grounded = false;
        }

        if (g.grounded) {
          g.runFrameTimer += dt;
          if (g.runFrameTimer >= 1 / 8) {
            g.runFrameTimer = 0;
            g.runFrameIdx = g.runFrameIdx === 0 ? 1 : 0;
          }
        }

        const pLeft = PLAYER_SCREEN_X - PLAYER_W / 2;
        const pRight = PLAYER_SCREEN_X + PLAYER_W / 2;
        const pBottom = GROUND_Y + g.playerOffsetY;
        const pTop = pBottom - PLAYER_H;

        for (const o of g.obstacles) {
          if (o.resolved) continue;
          const hLeft = o.x - g.worldX;
          const hRight = hLeft + o.w;
          const hTop = GROUND_Y - o.h;
          const hBottom = GROUND_Y;
          if (pRight > hLeft && pLeft < hRight && pBottom > hTop && pTop < hBottom) {
            o.resolved = true;
            g.memeObstacle = o;
            g.memeStartedAt = now;
            const idx = g.hitTotal % MEMES.length;
            g.hitTotal += 1;
            phaseRef.current = "meme";
            setPhase("meme");
            setMemeIndex(idx);
            chime("hit");
            break;
          } else if (hRight < pLeft) {
            o.resolved = true;
            g.checkmarks.push({ startedAt: now, feetYAtSpawn: pBottom });
            setMilestones((m) => m + 1);
            chime("clear");
          }
        }

        if (phaseRef.current === "running" && !g.reachedFlag && g.flagX - g.worldX <= PLAYER_SCREEN_X) {
          g.reachedFlag = true;
          phaseRef.current = "scoring";
          setPhase("scoring");
        }
      } else if (phaseRef.current === "meme") {
        if (now - g.memeStartedAt >= 2400) {
          const o = g.memeObstacle;
          if (o) g.worldX = o.x + o.w + 10 - PLAYER_SCREEN_X;
          g.memeObstacle = null;
          setMilestones((m) => m + 1);
          phaseRef.current = "running";
          setPhase("running");
        }
      }

      renderScene(ctx, g, phaseRef.current, now);
      raf = requestAnimationFrame(draw);
    };

    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("keydown", onKey);
      canvas.removeEventListener("pointerdown", onPointerDown);
      document.body.style.overflow = "";
      game.current?.audio?.close?.().catch?.(() => {});
      game.current = null;
    };
  }, [open, startRun, closeGame, chime]);

  return (
    <>
      {/* CSS blink (compositor-friendly), not a JS animation loop */}
      <button type="button" data-hover aria-haspopup="dialog" onClick={openGame}
        className="numeral gm-blink"
        style={{
          letterSpacing: "0.22em", color: "#00ff66", background: "none", border: "none",
          cursor: "pointer", padding: "0.1rem 0", font: "inherit",
          textShadow: "0 0 6px rgba(0,255,102,0.5)",
        }}>
        ▸ GAME MODE
      </button>

      <AnimatePresence>
        {open && (
          <motion.div key="game-overlay" role="dialog" aria-modal="true" aria-label="Career dot exe, a retro platformer"
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.35 }}
            style={{
              position: "fixed", inset: 0, zIndex: 80, background: "#000",
              display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
              fontFamily: "var(--mono), monospace", color: "#00ff66",
            }}>
            <ScanlineOverlay reducedMotion={reducedMotion} />

            <button data-hover aria-label="Close game" onClick={closeGame}
              style={{ position: "absolute", top: "1rem", right: "1.2rem", zIndex: 90, background: "none",
                border: "1px solid rgba(0,255,102,0.4)", color: "#00ff66", fontFamily: "var(--mono), monospace",
                cursor: "pointer", padding: "0.3rem 0.6rem", fontSize: "0.75rem",
                textShadow: "0 0 8px rgba(0,255,102,0.6)" }}>
              ✕ EXIT
            </button>

            <div style={{ position: "relative", zIndex: 2, display: "flex", flexDirection: "column",
              alignItems: "center", gap: "0.9rem", padding: "1rem", width: "100%" }}>

              {(phase === "running" || phase === "meme") && (
                <div style={{ display: "flex", justifyContent: "space-between", width: "min(92vw, 960px)",
                  fontSize: "0.75rem", letterSpacing: "0.12em", textShadow: "0 0 8px rgba(0,255,102,0.6)" }}>
                  <span>CAREER.EXE</span>
                  <span>MILESTONES {milestones}/{OBSTACLE_DEFS.length}</span>
                </div>
              )}

              <div style={{ position: "relative" }}>
                <canvas ref={canvasRef}
                  style={{ width: "min(92vw, 960px)", aspectRatio: "16/9", imageRendering: "pixelated",
                    border: "1px solid rgba(0,255,102,0.35)", display: "block", touchAction: "none" }} />

                {phase === "boot" && <BootScreen text={bootText} />}
                {phase === "title" && <TitleScreen onStart={startRun} />}
                {phase === "meme" && <MemeScreen meme={MEMES[memeIndex]} />}
                {phase === "scoring" && (
                  <ScoringScreen stage={scoreStage} score={score} onPlayAgain={startRun} onReturn={closeGame} />
                )}
              </div>

              {(phase === "running" || phase === "meme") && (
                <p style={{ fontSize: "0.7rem", letterSpacing: "0.14em", color: "rgba(0,255,102,0.5)",
                  textShadow: "0 0 8px rgba(0,255,102,0.6)" }}>
                  SPACE / TAP = JUMP · ESC = EXIT
                </p>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
