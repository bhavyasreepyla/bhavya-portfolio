"use client";
import { useEffect, useRef } from "react";

/*
 * The living background — an Active Theory-style particle void.
 * A fixed canvas behind every section: drifting star-dust where some
 * particles are glyphs from the eight scripts of the name reveal.
 * Constellation lines are always alive; the cursor ignites them gold,
 * and scrolling drags the whole field in parallax.
 */
const GLYPHS = "भव्यासుందరశక్తిبهافياブハヴィヤ뷔하브야ΞΨΩΣБХАВЯꦧꦲꦮBHAVYA".split("");

export default function GlyphField() {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w, h, dpr, particles, raf;
    let mouseDist = null; // per-frame cache of each particle's distance to the cursor
    const mouse = { x: -9999, y: -9999 };
    let lastScrollY = window.scrollY;

    const build = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = window.innerWidth;
      h = window.innerHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      canvas.style.width = w + "px";
      canvas.style.height = h + "px";
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const count = Math.min(140, Math.floor((w * h) / 11000));
      particles = Array.from({ length: count }, () => {
        const z = 0.25 + Math.random() * 0.75; // depth: far → near
        return {
          x: Math.random() * w,
          y: Math.random() * h,
          z,
          vx: (Math.random() - 0.5) * 0.16 * z,
          vy: (Math.random() - 0.5) * 0.16 * z,
          glyph: Math.random() < 0.3 ? GLYPHS[Math.floor(Math.random() * GLYPHS.length)] : null,
          size: z * (Math.random() < 0.3 ? 15 : 1.8),
          phase: Math.random() * Math.PI * 2,
        };
      });
    };

    const draw = (t) => {
      ctx.clearRect(0, 0, w, h);
      const time = t * 0.001;

      // scroll parallax — the field drags against the page
      const sy = window.scrollY;
      const scrollDelta = sy - lastScrollY;
      lastScrollY = sy;

      // constellation lines — always alive, ignited near the cursor.
      // squared-distance culling: sqrt only for actual neighbors, and each
      // particle's mouse distance is computed once per frame, not per pair.
      const n = particles.length;
      if (!mouseDist || mouseDist.length < n) mouseDist = new Float32Array(n);
      for (let i = 0; i < n; i++) {
        const p = particles[i];
        const dx = p.x - mouse.x, dy = p.y - mouse.y;
        mouseDist[i] = Math.sqrt(dx * dx + dy * dy);
      }
      const LINK = 105, LINK2 = LINK * LINK;
      ctx.lineWidth = 1;
      for (let i = 0; i < n; i++) {
        const p = particles[i];
        for (let j = i + 1; j < n; j++) {
          const q = particles[j];
          const dx = p.x - q.x, dy = p.y - q.y;
          const d2 = dx * dx + dy * dy;
          if (d2 < LINK2) {
            const d = Math.sqrt(d2);
            const near = Math.max(0, 1 - Math.min(mouseDist[i], mouseDist[j]) / 260);
            const base = 0.05 * (1 - d / LINK);
            ctx.strokeStyle = near > 0.02
              ? `rgba(201,168,124,${base + 0.3 * near * (1 - d / LINK)})`
              : `rgba(242,237,227,${base})`;
            ctx.beginPath();
            ctx.moveTo(p.x, p.y);
            ctx.lineTo(q.x, q.y);
            ctx.stroke();
          }
        }
      }

      for (let i = 0; i < n; i++) {
        const p = particles[i];
        if (!reduced) {
          p.x += p.vx;
          p.y += p.vy - scrollDelta * p.z * 0.22;
          if (p.x < -25) p.x = w + 25; else if (p.x > w + 25) p.x = -25;
          if (p.y < -25) p.y = h + 25; else if (p.y > h + 25) p.y = -25;
        }

        const near = Math.max(0, 1 - mouseDist[i] / 260);
        const twinkle = 0.65 + 0.35 * Math.sin(time * (0.5 + p.z) + p.phase);

        if (p.glyph) {
          const alpha = (0.16 + 0.2 * near) * twinkle * p.z;
          ctx.fillStyle = near > 0.04
            ? `rgba(201,168,124,${Math.min(0.85, alpha + near * 0.4)})`
            : `rgba(242,237,227,${alpha})`;
          ctx.font = `${p.size + near * 4}px serif`;
          ctx.textAlign = "center";
          ctx.textBaseline = "middle";
          ctx.fillText(p.glyph, p.x, p.y);
        } else {
          const alpha = (0.3 + 0.4 * near) * twinkle * p.z;
          ctx.fillStyle = near > 0.04
            ? `rgba(232,213,181,${alpha})`
            : `rgba(242,237,227,${alpha * 0.75})`;
          ctx.beginPath();
          ctx.arc(p.x, p.y, p.size + near * 1.4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      raf = requestAnimationFrame(draw);
    };

    const onMouse = (e) => { mouse.x = e.clientX; mouse.y = e.clientY; };
    const onLeave = () => { mouse.x = -9999; mouse.y = -9999; };

    build();
    raf = requestAnimationFrame(draw);
    window.addEventListener("resize", build);
    window.addEventListener("mousemove", onMouse);
    document.addEventListener("mouseleave", onLeave);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", build);
      window.removeEventListener("mousemove", onMouse);
      document.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      style={{ position: "fixed", inset: 0, zIndex: 0, pointerEvents: "none" }}
    />
  );
}
