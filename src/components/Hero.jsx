"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import NameReveal from "./NameReveal";
import ScrambleText from "./ScrambleText";
import Magnetic from "./Magnetic";
import GameMode from "./GameMode";

export default function Hero() {
  const [ready, setReady] = useState(false);
  const ref = useRef(null);

  // the reveal plays once per session — returning visitors go straight in
  useEffect(() => {
    if (sessionStorage.getItem("bsp-revealed")) setReady(true);
  }, []);

  const onRevealComplete = () => {
    sessionStorage.setItem("bsp-revealed", "1");
    setReady(true);
  };
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"], layoutEffect: false });
  const yTitle = useTransform(scrollYProgress, [0, 0.5], [0, -180]);
  const opTitle = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const gridOp = useTransform(scrollYProgress, [0, 0.3], [0.6, 0]);

  // wordmark: starts large beside the title, settles into the nav
  const bspSize = useTransform(scrollYProgress, [0, 0.15], ["clamp(1.6rem, 3vw, 2.6rem)", "clamp(1rem, 1.4vw, 1.2rem)"]);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {!ready && <NameReveal onComplete={onRevealComplete} />}

      <motion.nav initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 40,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "1.1rem var(--gutter)",
          background: "linear-gradient(to bottom, rgba(12,9,6,0.92) 0%, transparent 100%)",
          pointerEvents: ready ? "auto" : "none" }}>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 2 }}>
          <motion.span data-hover onClick={() => go("Hero")}
            style={{ fontSize: bspSize, fontWeight: 900, color: "var(--cream)",
              letterSpacing: "-0.03em", cursor: "pointer", whiteSpace: "nowrap" }}>
            BSP<span style={{ color: "var(--gold)" }}>.</span>
          </motion.span>
          <GameMode />
        </div>
        <div style={{ display: "flex", gap: "clamp(1.2rem, 3vw, 2.5rem)", alignItems: "center" }}>
          {[["WhatIBuild", "Work"], ["BeyondCode", "Story"], ["Contact", "Contact"]].map(([id, l]) => (
            <ScrambleText key={id} text={l} data-hover onClick={() => go(id)} className="label"
              style={{ cursor: "pointer", transition: "color 0.3s", color: "var(--muted)", minWidth: "4.5ch", textAlign: "center" }}
              onMouseLeave={(e) => (e.target.style.color = "var(--muted)")}
              onMouseOver={(e) => (e.target.style.color = "var(--gold)")} />
          ))}
        </div>
      </motion.nav>

      <section id="Hero" ref={ref} style={{ position: "relative", minHeight: "100vh",
        display: "flex", alignItems: "center", overflow: "hidden" }}>

        {/* candlelight */}
        <div style={{ position: "absolute", inset: 0, pointerEvents: "none",
          background: "radial-gradient(ellipse 60% 50% at 72% 20%, rgba(201,168,124,0.09), transparent 60%), radial-gradient(ellipse 50% 40% at 8% 90%, rgba(180,85,45,0.05), transparent 55%)" }} />

        {/* light beam */}
        <div style={{ position: "absolute", top: 0, left: "55%", width: 1, height: "100%",
          background: "linear-gradient(to bottom, transparent 0%, rgba(201,168,124,0.1) 30%, rgba(201,168,124,0.1) 70%, transparent 100%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, left: "55%", width: 200, height: "100%", transform: "translateX(-100px)",
          background: "linear-gradient(to bottom, transparent 10%, rgba(201,168,124,0.02) 40%, rgba(201,168,124,0.02) 60%, transparent 90%)",
          pointerEvents: "none", filter: "blur(30px)" }} />

        {/* perspective grid — the stage floor */}
        <motion.div style={{ opacity: gridOp, position: "absolute", bottom: 0, left: "-20%", width: "140%", height: "50%",
          transform: "perspective(500px) rotateX(60deg)", transformOrigin: "bottom center",
          backgroundImage: "linear-gradient(rgba(201,168,124,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,124,0.045) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "linear-gradient(to top, black 20%, transparent)", WebkitMaskImage: "linear-gradient(to top, black 20%, transparent)",
          pointerEvents: "none" }} />

        {/* ghost script watermark */}
        <span aria-hidden className="watermark" style={{
          right: "-2%", top: "50%", transform: "translateY(-50%)",
          fontSize: "clamp(14rem, 34vw, 34rem)", writingMode: "vertical-rl" }}>
          భవ్య
        </span>

        {/* content */}
        <motion.div style={{ y: yTitle, opacity: opTitle, position: "relative", zIndex: 2,
          padding: "0 var(--gutter)", width: "100%" }}>

          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: ready ? 1 : 0, x: ready ? 0 : -30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "2rem" }}>
            <div style={{ width: 50, height: 1, background: "linear-gradient(to right, var(--gold), transparent)" }} />
            <span className="label" style={{ color: "var(--gold)" }}>
              AI Engineer <span style={{ color: "var(--faint)" }}>·</span> Builder <span style={{ color: "var(--faint)" }}>·</span> Dancer
            </span>
          </motion.div>

          <h1 style={{ fontWeight: 900, fontSize: "clamp(3.6rem, 12vw, 13rem)", lineHeight: 0.88,
            letterSpacing: "-0.04em", marginBottom: "2.5rem", color: "var(--cream)",
            animation: ready ? "rgbGlitch 0.5s steps(2) 1.9s 1 both" : "none" }}>
            <span style={{ display: "block", overflow: "hidden" }}>
              {"Bhavya".split("").map((ch, i) => (
                <motion.span key={i} initial={{ y: "110%" }} animate={{ y: ready ? "0%" : "110%" }}
                  transition={{ duration: 0.9, delay: 0.55 + i * 0.05, ease: [0.22, 1, 0.36, 1] }}
                  className="glitch-hover"
                  style={{ display: "inline-block" }}>{ch}</motion.span>
              ))}
            </span>
            <span style={{ display: "block", overflow: "hidden" }}>
              <motion.span initial={{ y: "110%" }} animate={{ y: ready ? "0%" : "110%" }}
                transition={{ duration: 1, delay: 0.95, ease: [0.22, 1, 0.36, 1] }}
                style={{ display: "inline-block" }}>
                <span className="serif-italic" style={{ color: "var(--gold)", fontWeight: 340, fontSize: "0.9em" }}>Sree Pyla</span>
                <span style={{ color: "var(--gold)" }}>.</span>
              </motion.span>
            </span>
          </h1>

          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 30 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{ fontSize: "clamp(1rem, 1.5vw, 1.2rem)", color: "var(--muted)", maxWidth: 520,
              lineHeight: 1.7, fontWeight: 300, marginBottom: "0.9rem" }}>
            Engineering intelligence from idea to impact,{" "}
            <span className="serif-italic" style={{ color: "var(--cream)", fontSize: "1.08em" }}>
              where logic meets intuition
            </span>.
          </motion.p>

          <motion.p initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ duration: 0.8, delay: 1.2 }}
            className="numeral" style={{ marginBottom: "3rem", letterSpacing: "0.18em" }}>
            MS ARTIFICIAL INTELLIGENCE · NORTHEASTERN UNIVERSITY · PORTLAND, ME
          </motion.p>

          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: ready ? 1 : 0, y: ready ? 0 : 20 }}
            transition={{ duration: 0.8, delay: 1.4 }} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <Magnetic>
              <button data-hover className="btn" onClick={() => go("WhatIBuild")}>
                <ScrambleText text="See My Work" /> <span style={{ color: "var(--gold)" }}>→</span>
              </button>
            </Magnetic>
            <Magnetic>
              <button data-hover className="btn btn--ghost" onClick={() => go("Contact")}>
                <ScrambleText text="Get in Touch" />
              </button>
            </Magnetic>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }} transition={{ delay: 2.5 }}
          style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 8 }}>
          <span className="numeral" style={{ letterSpacing: "0.35em" }}>SCROLL</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 1, height: 30, background: "linear-gradient(to bottom, var(--faint), transparent)" }} />
        </motion.div>
      </section>

      {/* training telemetry stream */}
      <div style={{ overflow: "hidden", padding: "1.4rem 0",
        borderTop: "1px solid var(--hairline)", borderBottom: "1px solid var(--hairline)" }}>
        <div className="marquee-track" style={{ "--marquee-dur": "42s" }}>
          {[0, 1].map((k) => (
            <span key={k} className="label" style={{ paddingRight: "4rem", color: "#4a4238" }}>
              <span style={{ color: "var(--gold)" }}>▸</span> EPOCH 47/50
              {" · "}LOSS 0.0123 <span style={{ color: "var(--gold)" }}>▼</span>
              {" · "}VAL_ACC 98.4% <span style={{ color: "var(--gold)" }}>▲</span>
              {" · "}F1 0.97{" · "}LR 3E-4{" · "}CUDA:0 <span style={{ color: "var(--gold)" }}>✓</span>
              {" · "}DEEP LEARNING{" · "}COMPUTER VISION{" · "}NLP{" · "}RECOMMENDER SYSTEMS
              {" · "}BHARATANATYAM{" · "}GRADIENTS STABLE{" · "}ALL SYSTEMS NOMINAL{" ·  "}
            </span>
          ))}
        </div>
      </div>
    </>
  );
}
