"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function BeyondCode() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"], layoutEffect: false });

  const headingScale = useTransform(scrollYProgress, [0.05, 0.25], [1.2, 0.7]);
  const headingOp = useTransform(scrollYProgress, [0.15, 0.35], [1, 0]);
  const headingY = useTransform(scrollYProgress, [0.05, 0.35], [0, -100]);
  const contentOp = useTransform(scrollYProgress, [0.25, 0.4], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.25, 0.4], [60, 0]);
  const orbY = useTransform(scrollYProgress, [0, 1], [0, -120]);

  return (
    <>
      {/* Cormorant Garamond for mothersauce-style heading + Pixelify Sans for body */}
      <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,600;0,700;1,300;1,400;1,600;1,700&family=Pixelify+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" />

      <section id="BeyondCode" ref={ref} style={{
        position: "relative", background: "#0a0a0a", overflow: "hidden", minHeight: "160vh",
      }}>
        <motion.div style={{ y: orbY, position: "absolute", inset: 0, pointerEvents: "none" }}>
          <div style={{ position: "absolute", top: "10%", right: "8%", width: "30vw", height: "30vw",
            background: "radial-gradient(circle, rgba(201,168,124,0.04), transparent 60%)", filter: "blur(50px)" }} />
          <div style={{ position: "absolute", bottom: "15%", left: "5%", width: "25vw", height: "25vw",
            background: "radial-gradient(circle, rgba(201,168,124,0.03), transparent 60%)", filter: "blur(50px)" }} />
        </motion.div>
        <div style={{ position: "absolute", inset: 0, opacity: 0.012, pointerEvents: "none",
          backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 2px, rgba(255,255,255,0.08) 2px, rgba(255,255,255,0.08) 3px)" }} />

        <div style={{ position: "sticky", top: 0, height: "100vh",
          display: "flex", alignItems: "center", justifyContent: "center",
          flexDirection: "column", padding: "0 clamp(2rem, 8vw, 10rem)" }}>

          {/* HEADING — Cormorant Garamond italic (mothersauce ornate serif) */}
          <motion.div style={{ scale: headingScale, opacity: headingOp, y: headingY,
            position: "absolute", textAlign: "center", pointerEvents: "none" }}>
            <h2 style={{
              fontSize: "clamp(5rem, 15vw, 16rem)",
              fontWeight: 600,
              lineHeight: 0.85,
              letterSpacing: "-0.02em",
              color: "#c9a87c",
              fontFamily: "'Cormorant Garamond', serif",
              fontStyle: "italic",
            }}>
              Beyond<br />Code
            </h2>
          </motion.div>

          {/* CONTENT — Pixelify Sans */}
          <motion.div style={{ opacity: contentOp, y: contentY, maxWidth: 700, width: "100%" }}>
            <p style={{
              fontSize: "clamp(1rem, 1.4vw, 1.15rem)",
              color: "#c8c3be",
              lineHeight: 2.2,
              textAlign: "justify",
              fontFamily: "'Pixelify Sans', cursive",
              fontWeight: 400,
              letterSpacing: "0.02em",
            }}>
              Tanzania is my home. Not just where I lived — it&apos;s <span style={{ color: "#c9a87c", fontWeight: 700 }}>home</span>. Growing up there shaped everything about how I see the world. It gave me a global perspective, taught me adaptability, and showed me that there are so many different ways of life — all valid, all valuable. I&apos;ve been doing Bharatanatyam since I was four. 12+ years as my shelter, my way to connect with myself. Dance taught me discipline, patience, precision. This art form reminds me that AI, like dance, needs <span style={{ color: "#c9a87c", fontWeight: 700 }}>creativity, nuance, and a willingness to interpret the world in new ways</span>. I&apos;m optimistic by default — not superficially, but in the sense that I believe most problems can be worked through with enough curiosity and effort. I gravitate toward people who take responsibility for their path and want to build something meaningful, even when it&apos;s hard. <span style={{ fontStyle: "italic", color: "#8a8580" }}>I think technology fails most often not because it&apos;s too complex, but because it forgets who it&apos;s for. I&apos;m intentional about not making that mistake.</span>
            </p>

            <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
              transition={{ duration: 1, delay: 0.3 }} viewport={{ once: true }}
              style={{ height: 1, marginTop: "3rem", transformOrigin: "center",
                background: "linear-gradient(to right, transparent, rgba(201,168,124,0.2), transparent)" }} />
          </motion.div>
        </div>
      </section>
    </>
  );
}