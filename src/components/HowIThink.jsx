"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const ITEMS = [
  { n: "01", title: "User experience", sub: "over metrics", desc: "Numbers lie. The person using your system never does." },
  { n: "02", title: "Simplicity", sub: "over complexity", desc: "If you can't explain it simply, you don't understand it deeply enough." },
  { n: "03", title: "AI amplifies", sub: "not replaces", desc: "The best systems make humans more capable, not more replaceable." },
  { n: "04", title: "Endurance", sub: "over excuses", desc: "Talent gets you started. Showing up every single day gets you there." },
];

/*
 * Each card tracks its own position relative to the viewport.
 * When it enters from the bottom → rotateX(35deg), scaled down, faded.
 * When it hits center → rotateX(0), full scale, full opacity.
 * When it exits top → rotateX(-35deg), scaled down, faded.
 * This creates the vertical "spine" / drum effect from at.mp4.
 */
function SpineCard({ item, index }) {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start end", "end start"],
    layoutEffect: false,
  });

  // 0 = card entering from bottom, 0.5 = center of viewport, 1 = exiting top
  const rotateX = useTransform(scrollYProgress, [0, 0.35, 0.5, 0.65, 1], [45, 10, 0, -10, -45]);
  const scale = useTransform(scrollYProgress, [0, 0.35, 0.5, 0.65, 1], [0.7, 0.9, 1, 0.9, 0.7]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.5, 0.7, 1], [0, 0.7, 1, 0.7, 0]);
  const z = useTransform(scrollYProgress, [0, 0.5, 1], [-150, 0, -150]);

  return (
    <div ref={ref} style={{
      height: "70vh", display: "flex", alignItems: "center", justifyContent: "center",
      perspective: "1000px",
    }}>
      <motion.div
        data-hover
        style={{
          rotateX, scale, opacity, z,
          transformStyle: "preserve-3d",
          width: "min(600px, 85vw)",
          padding: "clamp(2rem, 4vw, 3.5rem)",
          borderRadius: 20,
          background: "rgba(201,168,124,0.025)",
          border: "1px solid rgba(201,168,124,0.08)",
          backdropFilter: "blur(6px)",
          position: "relative", overflow: "hidden",
          transformOrigin: "center center",
          boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
        }}
      >
        {/* ghost number */}
        <span style={{
          position: "absolute", top: "0.5rem", right: "1.5rem",
          fontSize: "clamp(5rem, 12vw, 10rem)", fontWeight: 900,
          color: "transparent", WebkitTextStroke: "1px rgba(201,168,124,0.05)",
          lineHeight: 1, pointerEvents: "none",
        }}>{item.n}</span>

        <span style={{ color: "#c9a87c", fontSize: "0.6rem", fontFamily: "monospace",
          letterSpacing: "0.25em", marginBottom: "1.2rem", display: "block" }}>({item.n})</span>
        <h3 style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 900,
          color: "#f5f0eb", letterSpacing: "-0.03em", lineHeight: 1.05, marginBottom: "0.3rem" }}>
          {item.title}
        </h3>
        <p style={{ fontSize: "clamp(1.3rem, 2.5vw, 2rem)", fontWeight: 300,
          color: "#c9a87c", marginBottom: "1.2rem", letterSpacing: "-0.02em" }}>
          {item.sub}
        </p>
        <p style={{ fontSize: "0.85rem", color: "#8a8580", maxWidth: 420, lineHeight: 1.7 }}>
          {item.desc}
        </p>
      </motion.div>
    </div>
  );
}

export default function HowIThink() {
  return (
    <section id="HowIThink" style={{
      position: "relative", padding: "6rem clamp(2rem, 8vw, 10rem) 0",
      background: "#0a0a0a", overflow: "hidden",
    }}>
      {/* ambient glow */}
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)",
        width: "50vw", height: "50vw", borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,168,124,0.03), transparent 60%)",
        filter: "blur(60px)", pointerEvents: "none" }} />

      {/* heading — outside the scroll area, stays visible */}
      <div style={{ maxWidth: 700, margin: "0 auto", position: "relative", zIndex: 1, marginBottom: "0" }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.8rem" }}>
            <div style={{ width: 50, height: 1, background: "linear-gradient(to right, #c9a87c, transparent)" }} />
            <span style={{ color: "#5a5a5a", fontSize: "0.55rem", letterSpacing: "0.3em", fontFamily: "monospace", textTransform: "uppercase" }}>PHILOSOPHY</span>
          </div>
          <h2 style={{ fontSize: "clamp(3rem, 7vw, 7rem)", fontWeight: 900, lineHeight: 0.85,
            letterSpacing: "-0.05em", color: "#f5f0eb" }}>
            How I<br />Think<span style={{ color: "#c9a87c" }}>.</span>
          </h2>
        </motion.div>
      </div>

      {/* spine cards */}
      <div style={{ position: "relative", zIndex: 1 }}>
        {ITEMS.map((item, i) => (
          <SpineCard key={item.n} item={item} index={i} />
        ))}
      </div>
    </section>
  );
}