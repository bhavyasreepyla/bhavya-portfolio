"use client";
import { useEffect, useState, useRef } from "react";

/*
 * Fixed cockpit readout — Active Theory-style overlay UI.
 * Bottom-left: current section index + scroll progress rail.
 * Bottom-right: live FPS counter. Pointer-transparent, pure telemetry.
 */
const SECTIONS = [
  ["Hero", "INDEX"],
  ["HowIThink", "PHILOSOPHY"],
  ["WhatIBuild", "WORK"],
  ["Experience", "EXPERIENCE"],
  ["BeyondCode", "STORY"],
  ["Letter", "LETTER"],
  ["Contact", "CONNECT"],
];

export default function HUD() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);
  const [progress, setProgress] = useState(0);
  const [fps, setFps] = useState(60);
  const frames = useRef(0);

  useEffect(() => {
    const show = setTimeout(() => setVisible(true), 4600);

    // section tracking
    const obs = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            const idx = SECTIONS.findIndex(([id]) => id === e.target.id);
            if (idx >= 0) setCurrent(idx);
          }
        }
      },
      { threshold: 0.35 }
    );
    SECTIONS.forEach(([id]) => {
      const el = document.getElementById(id);
      if (el) obs.observe(el);
    });

    // scroll progress
    const onScroll = () => {
      const max = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(max > 0 ? window.scrollY / max : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });

    // fps counter
    let raf;
    const loop = () => { frames.current++; raf = requestAnimationFrame(loop); };
    raf = requestAnimationFrame(loop);
    const fpsIv = setInterval(() => { setFps(frames.current * 2); frames.current = 0; }, 500);

    return () => {
      clearTimeout(show);
      obs.disconnect();
      window.removeEventListener("scroll", onScroll);
      cancelAnimationFrame(raf);
      clearInterval(fpsIv);
    };
  }, []);

  return (
    <div aria-hidden style={{
      position: "fixed", bottom: 0, left: 0, right: 0, zIndex: 45,
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "0.9rem var(--gutter)", pointerEvents: "none",
      opacity: visible ? 1 : 0, transition: "opacity 1.2s var(--settle)",
      background: "linear-gradient(to top, rgba(12,9,6,0.85), transparent)",
    }}>
      <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
        <span className="numeral" style={{ color: "var(--gold)", letterSpacing: "0.2em" }}>
          {String(current + 1).padStart(2, "0")} / {String(SECTIONS.length).padStart(2, "0")}
        </span>
        <span className="numeral" style={{ letterSpacing: "0.3em", minWidth: "8ch" }}>
          {SECTIONS[current][1]}
        </span>
        <div className="hide-mobile" style={{ width: 130, height: 1, background: "var(--hairline)" }}>
          <div style={{ width: `${progress * 100}%`, height: "100%", background: "var(--gold)",
            transition: "width 0.15s linear" }} />
        </div>
      </div>
      <div className="hide-mobile" style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
        <span className="numeral" style={{ letterSpacing: "0.2em" }}>
          {String(Math.round(progress * 100)).padStart(3, "0")}%
        </span>
        <span className="numeral" style={{ color: "var(--gold)", letterSpacing: "0.2em", minWidth: "7ch", textAlign: "right" }}>
          {fps} FPS
        </span>
      </div>
    </div>
  );
}
