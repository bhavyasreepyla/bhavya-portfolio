"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const LINES = [
  { text: "You're probably here because you're trying to understand who I am beyond bullet points and project descriptions." },
  { text: "I value clarity, honesty, and doing work that actually matters.", highlight: "I care about impact, thoughtfulness, and responsibility." },
  { text: "I'm still learning, still growing, and still figuring out what kind of engineer and researcher I want to become. But I know I want to work on problems that require both technical depth and human understanding." },
  { text: "If that resonates with you, I'd love to talk.", isAccent: true },
];

export default function Letter() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"], layoutEffect: false });
  const lineW = useTransform(scrollYProgress, [0.2, 0.5], ["0%", "100%"]);

  return (
    <section id="Letter" ref={ref} style={{
      position: "relative", padding: "6rem clamp(2rem, 8vw, 10rem)",
      background: "#0a0a0a", overflow: "hidden",
    }}>
      {/* accent glow */}
      <div style={{ position: "absolute", top: "30%", left: "50%", transform: "translateX(-50%)",
        width: "40vw", height: "40vw", background: "radial-gradient(circle, rgba(201,168,124,0.025), transparent 60%)",
        filter: "blur(60px)", pointerEvents: "none" }} />

      <div style={{ maxWidth: 650, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* animated decorative line */}
        <motion.div style={{ width: lineW, height: 1, marginBottom: "3rem", margin: "0 auto 3rem",
          background: "linear-gradient(to right, transparent, rgba(201,168,124,0.3), transparent)" }} />

        <motion.h2 initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} viewport={{ once: true }}
          style={{ fontSize: "clamp(1.8rem, 3.5vw, 2.5rem)", fontWeight: 900, color: "#f5f0eb",
            textAlign: "center", marginBottom: "2.5rem", letterSpacing: "-0.03em" }}>
          If You're Reading This<span style={{ color: "#c9a87c" }}>.</span>
        </motion.h2>

        {/* staggered word reveal */}
        {LINES.map((line, i) => (
          <motion.div key={i}
            initial={{ opacity: 0, y: 20, filter: "blur(4px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            transition={{ duration: 0.7, delay: i * 0.1, ease: [0.22,1,0.36,1] }}
            viewport={{ once: true, margin: "-40px" }}
            style={{ marginBottom: i < LINES.length - 1 ? "1.5rem" : 0, textAlign: "center" }}
          >
            {line.isAccent ? (
              <p style={{ fontSize: "clamp(1.1rem, 1.6vw, 1.3rem)", color: "#c9a87c", fontWeight: 600, lineHeight: 1.7 }}>
                {line.text}
              </p>
            ) : (
              <p style={{ fontSize: "clamp(0.95rem, 1.3vw, 1.05rem)", color: "#c8c3be", lineHeight: 1.85 }}>
                {line.text}{line.highlight && <span style={{ color: "#c9a87c", fontWeight: 600 }}>{" "}{line.highlight}</span>}
              </p>
            )}
          </motion.div>
        ))}

        {/* animated closing line */}
        <motion.div style={{ width: lineW, height: 1, marginTop: "3rem", margin: "3rem auto 0",
          background: "linear-gradient(to right, transparent, rgba(201,168,124,0.3), transparent)" }} />
      </div>
    </section>
  );
}