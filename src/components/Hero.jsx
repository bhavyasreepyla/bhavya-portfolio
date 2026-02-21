"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState } from "react";
import NameReveal from "./NameReveal";

export default function Hero() {
  const [ready, setReady] = useState(false);
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"], layoutEffect: false });
  const yTitle = useTransform(scrollYProgress, [0, 0.5], [0, -180]);
  const opTitle = useTransform(scrollYProgress, [0, 0.35], [1, 0]);
  const gridOp = useTransform(scrollYProgress, [0, 0.3], [0.5, 0]);

  // BSP: starts large, shrinks to nav size, stays fully visible
  const bspSize = useTransform(scrollYProgress, [0, 0.15], ["clamp(1.8rem, 3.5vw, 3rem)", "clamp(0.8rem, 1.2vw, 1rem)"]);
  const bspWeight = useTransform(scrollYProgress, [0, 0.15], [900, 700]);

  const go = (id) => document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });

  return (
    <>
      {!ready && <NameReveal onComplete={() => setReady(true)} />}

      <motion.nav initial={{ opacity: 0 }} animate={{ opacity: ready ? 1 : 0 }}
        transition={{ duration: 0.8, delay: 0.3 }}
        style={{ position: "fixed", top: 0, left: 0, right: 0, zIndex: 40,
          display: "flex", justifyContent: "space-between", alignItems: "center",
          padding: "1.2rem clamp(1.5rem, 4vw, 3rem)",
          background: "linear-gradient(to bottom, rgba(10,10,10,0.9) 0%, transparent 100%)",
          pointerEvents: ready ? "auto" : "none" }}>
        <motion.span data-hover onClick={() => go("Hero")}
          style={{ fontSize: bspSize, fontWeight: bspWeight, color: "#f5f0eb",
            letterSpacing: "-0.03em", cursor: "pointer", whiteSpace: "nowrap" }}>
          BSP<span style={{ color: "#c9a87c" }}>.</span>
        </motion.span>
        <div style={{ display: "flex", gap: "2rem" }}>
          {[["WhatIBuild","Work"],["BeyondCode","Story"],["Contact","Contact"]].map(([id,l])=>(
            <span key={id} data-hover onClick={() => go(id)}
              style={{ color: "#8a8580", fontSize: "0.55rem", letterSpacing: "0.15em",
                textTransform: "uppercase", fontFamily: "monospace", cursor: "pointer", transition: "color 0.3s" }}
              onMouseEnter={e=>e.target.style.color="#c9a87c"}
              onMouseLeave={e=>e.target.style.color="#8a8580"}>{l}</span>
          ))}
        </div>
      </motion.nav>

      <section id="Hero" ref={ref} style={{ position: "relative", minHeight: "100vh",
        display: "flex", alignItems: "center", overflow: "hidden", background: "#0a0a0a" }}>

        {/* atmospheric bg */}
        <div style={{ position: "absolute", inset: 0,
          background: "radial-gradient(ellipse at 70% 15%, rgba(201,168,124,0.07), transparent 50%), radial-gradient(ellipse at 10% 85%, rgba(201,168,124,0.04), transparent 45%), radial-gradient(ellipse at 85% 75%, rgba(120,100,80,0.03), transparent 40%)",
          backgroundSize: "200% 200%", animation: "meshShift 25s ease infinite" }} />
        {/* light beam */}
        <div style={{ position: "absolute", top: 0, left: "55%", width: 1, height: "100%",
          background: "linear-gradient(to bottom, transparent 0%, rgba(201,168,124,0.08) 30%, rgba(201,168,124,0.08) 70%, transparent 100%)", pointerEvents: "none" }} />
        <div style={{ position: "absolute", top: 0, left: "55%", width: 200, height: "100%", transform: "translateX(-100px)",
          background: "linear-gradient(to bottom, transparent 10%, rgba(201,168,124,0.015) 40%, rgba(201,168,124,0.015) 60%, transparent 90%)",
          pointerEvents: "none", filter: "blur(30px)" }} />
        {/* grid */}
        <motion.div style={{ opacity: gridOp, position: "absolute", bottom: 0, left: "-20%", width: "140%", height: "50%",
          transform: "perspective(500px) rotateX(60deg)", transformOrigin: "bottom center",
          backgroundImage: "linear-gradient(rgba(201,168,124,0.035) 1px, transparent 1px), linear-gradient(90deg, rgba(201,168,124,0.035) 1px, transparent 1px)",
          backgroundSize: "80px 80px",
          maskImage: "linear-gradient(to top, black 20%, transparent)", WebkitMaskImage: "linear-gradient(to top, black 20%, transparent)", pointerEvents: "none" }} />
        {/* orbs */}
        <div style={{ position: "absolute", top: "8%", right: "10%", width: 350, height: 350, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,124,0.05), transparent 60%)", filter: "blur(50px)",
          animation: "floatA 18s ease-in-out infinite", pointerEvents: "none" }} />
        <div style={{ position: "absolute", bottom: "15%", left: "5%", width: 200, height: 200, borderRadius: "50%",
          background: "radial-gradient(circle, rgba(201,168,124,0.03), transparent 60%)", filter: "blur(40px)",
          animation: "floatB 22s ease-in-out infinite", pointerEvents: "none" }} />
        {/* scan */}
        <div style={{ position: "absolute", left: 0, right: 0, height: 1,
          background: "linear-gradient(to right, transparent, rgba(201,168,124,0.06), transparent)",
          animation: "scanDown 10s linear infinite", pointerEvents: "none" }} />
        {/* corners */}
        {[[0,0],[0,1],[1,0],[1,1]].map(([v,h],i) => (
          <div key={i} style={{ position: "absolute", width: 35, height: 35, pointerEvents: "none",
            ...(v===0?{top:24}:{bottom:24}), ...(h===0?{left:24}:{right:24}),
            borderColor: "rgba(201,168,124,0.08)", borderStyle: "solid", borderWidth: 0,
            ...(v===0?{borderTopWidth:1}:{borderBottomWidth:1}), ...(h===0?{borderLeftWidth:1}:{borderRightWidth:1}) }} />
        ))}

        {/* content */}
        <motion.div style={{ y: yTitle, opacity: opTitle, position: "relative", zIndex: 2,
          padding: "0 clamp(2rem, 8vw, 10rem)", width: "100%" }}>
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: ready?1:0, x: ready?0:-30 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1.5rem" }}>
            <div style={{ width: 50, height: 1, background: "linear-gradient(to right, #c9a87c, transparent)" }} />
            <span style={{ color: "#c9a87c", fontSize: "0.6rem", letterSpacing: "0.4em", textTransform: "uppercase", fontFamily: "monospace" }}>
              AI Engineer · Builder · Dancer</span>
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 60 }} animate={{ opacity: ready?1:0, y: ready?0:60 }}
            transition={{ duration: 1, delay: 0.6, ease: [0.22,1,0.36,1] }}
            style={{ fontSize: "clamp(3.5rem, 12vw, 14rem)", fontWeight: 900, lineHeight: 0.85,
              letterSpacing: "-0.05em", marginBottom: "2rem", color: "#f5f0eb" }}>
            Bhavya<br/><span style={{ color: "rgba(245,240,235,0.4)" }}>Sree Pyla</span><span style={{ color: "#c9a87c" }}>.</span>
          </motion.h1>
          <motion.p initial={{ opacity: 0, y: 30 }} animate={{ opacity: ready?1:0, y: ready?0:30 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{ fontSize: "clamp(1rem, 1.8vw, 1.3rem)", color: "#8a8580", maxWidth: 500, lineHeight: 1.65, fontWeight: 300, marginBottom: "1rem" }}>
            I build AI systems that actually work for humans—where <span style={{ color: "#c9a87c", fontWeight: 500 }}>logic meets intuition</span>.
          </motion.p>
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: ready?1:0 }} transition={{ duration: 0.8, delay: 1.2 }}
            style={{ fontSize: "0.75rem", color: "#5a5a5a", fontFamily: "monospace", letterSpacing: "0.05em", marginBottom: "3rem" }}>
            MS Artificial Intelligence — Northeastern University, Portland ME</motion.p>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: ready?1:0, y: ready?0:20 }}
            transition={{ duration: 0.8, delay: 1.4 }} style={{ display: "flex", gap: "1rem", flexWrap: "wrap" }}>
            <button data-hover onClick={() => go("WhatIBuild")} style={{
              padding: "1rem 2.5rem", fontSize: "0.7rem", fontWeight: 700, color: "#0a0a0a",
              background: "#c9a87c", border: "none", borderRadius: 6, fontFamily: "monospace",
              letterSpacing: "0.15em", textTransform: "uppercase", transition: "transform 0.2s, box-shadow 0.2s",
              boxShadow: "0 8px 30px rgba(201,168,124,0.2)" }}
              onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-2px)";e.currentTarget.style.boxShadow="0 12px 40px rgba(201,168,124,0.35)"}}
              onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 8px 30px rgba(201,168,124,0.2)"}}
            >See My Work →</button>
            <button data-hover onClick={() => go("Contact")} style={{
              padding: "1rem 2.5rem", fontSize: "0.7rem", fontWeight: 700, color: "#8a8580",
              background: "transparent", border: "1px solid rgba(201,168,124,0.2)", borderRadius: 6,
              fontFamily: "monospace", letterSpacing: "0.15em", textTransform: "uppercase", transition: "all 0.3s" }}
              onMouseEnter={e=>{e.currentTarget.style.borderColor="rgba(201,168,124,0.5)";e.currentTarget.style.color="#f5f0eb"}}
              onMouseLeave={e=>{e.currentTarget.style.borderColor="rgba(201,168,124,0.2)";e.currentTarget.style.color="#8a8580"}}
            >Get in Touch</button>
          </motion.div>
        </motion.div>

        <motion.div initial={{ opacity: 0 }} animate={{ opacity: ready?1:0 }} transition={{ delay: 2.5 }}
          style={{ position: "absolute", bottom: 28, left: "50%", transform: "translateX(-50%)",
            display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
          <span style={{ fontSize: "0.45rem", letterSpacing: "0.35em", color: "#5a5a5a", fontFamily: "monospace", textTransform: "uppercase" }}>Scroll</span>
          <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            style={{ width: 1, height: 30, background: "linear-gradient(to bottom, #5a5a5a, transparent)" }} />
        </motion.div>
      </section>

      <div style={{ overflow: "hidden", padding: "1.5rem 0", borderTop: "1px solid rgba(201,168,124,0.06)",
        borderBottom: "1px solid rgba(201,168,124,0.06)", background: "rgba(201,168,124,0.01)" }}>
        <div style={{ display: "flex", whiteSpace: "nowrap", width: "max-content", animation: "marquee 35s linear infinite" }}>
          {[0,1].map(k=>(<span key={k} style={{ fontSize: "0.65rem", color: "#3a3530", fontWeight: 700,
            letterSpacing: "0.4em", paddingRight: "4rem", fontFamily: "monospace" }}>
            AI ENGINEER • DEEP LEARNING • COMPUTER VISION • NLP • RECOMMENDER SYSTEMS • BHARATANATYAM • BUILDER • RESEARCHER •{" "}</span>))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes meshShift { 0%,100% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } }
        @keyframes floatA { 0%,100% { transform: translate(0,0); } 50% { transform: translate(20px,-30px); } }
        @keyframes floatB { 0%,100% { transform: translate(0,0); } 50% { transform: translate(-15px,25px); } }
        @keyframes scanDown { 0% { top: -1px; } 100% { top: 100%; } }
        @keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }
        @keyframes marqueeR { from { transform: translateX(-50%); } to { transform: translateX(0); } }
      `}</style>
    </>
  );
}