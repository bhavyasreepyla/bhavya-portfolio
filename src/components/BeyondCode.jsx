"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function BeyondCode() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
    layoutEffect: false,
  });

  const headingScale = useTransform(scrollYProgress, [0, 0.3], [1.15, 0.72]);
  const headingOp = useTransform(scrollYProgress, [0.18, 0.34], [1, 0]);
  const headingY = useTransform(scrollYProgress, [0, 0.34], [0, -110]);

  const contentOp = useTransform(scrollYProgress, [0.34, 0.48], [0, 1]);
  const contentY = useTransform(scrollYProgress, [0.34, 0.48], [60, 0]);

  return (
    <section id="BeyondCode" ref={ref} style={{
      position: "relative", overflow: "hidden",
      minHeight: "200vh",
    }}>
      {/* ember warmth: this section's one atmospheric element */}
      <div style={{ position: "absolute", top: "15%", right: "5%", width: "34vw", height: "34vw",
        background: "radial-gradient(circle, rgba(180,85,45,0.045), transparent 60%)",
        filter: "blur(50px)", pointerEvents: "none" }} />

      {/* ghost script watermark */}
      <span aria-hidden className="watermark" style={{
        left: "-4%", top: "8rem", fontSize: "clamp(12rem, 30vw, 28rem)" }}>
        భ
      </span>

      <div style={{
        position: "sticky", top: 0, minHeight: "100vh",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", padding: "5rem var(--gutter) 2.5rem",
      }}>
        <div className="section-head" style={{
          position: "absolute", top: "2.5rem", left: "var(--gutter)", right: "var(--gutter)",
          zIndex: 2, marginBottom: 0,
        }}>
          <div className="rule" />
          <span className="label">Story</span>
          <div className="dots" />
          <span className="numeral">04 · ೦೪</span>
        </div>

        {/* SCENE 1: the giant heading, scaling and fading away */}
        <motion.div style={{
          scale: headingScale, opacity: headingOp, y: headingY,
          position: "absolute", textAlign: "center", pointerEvents: "none", zIndex: 1,
        }}>
          <h2 className="serif-italic" style={{
            fontSize: "clamp(4.5rem, 14vw, 15rem)", fontWeight: 340, lineHeight: 0.9,
            letterSpacing: "-0.02em", color: "var(--gold)",
          }}>
            Beyond<br />code
          </h2>
        </motion.div>

        {/* SCENE 2: her words, verbatim, fading in beneath */}
        <motion.div style={{
          opacity: contentOp, y: contentY,
          maxWidth: 760, width: "100%", position: "relative", zIndex: 1,
        }}>
          {/* sized against viewport HEIGHT so the whole story always fits the pinned stage */}
          <p style={{ fontSize: "clamp(0.8rem, 2.1vh, 1.08rem)", color: "#c8c3be",
            lineHeight: 1.85, fontWeight: 300, textAlign: "justify" }}>
            Tanzania is my home. Not just where I lived — it&apos;s{" "}
            <span style={{ color: "var(--gold)", fontWeight: 500 }}>home</span>. Growing up
            there shaped everything about how I see the world. It gave me a global perspective,
            taught me adaptability, and showed me that there are so many different ways of life
            — all valid, all valuable. I&apos;ve been doing Bharatanatyam since I was four. 12+
            years as my shelter, my way to connect with myself. Dance taught me discipline,
            patience, precision. This art form reminds me that AI, like dance, needs{" "}
            <span style={{ color: "var(--gold)", fontWeight: 500 }}>
              creativity, nuance, and a willingness to interpret the world in new ways
            </span>. I&apos;m optimistic by default — not superficially, but in the sense that I
            believe most problems can be worked through with enough curiosity and effort. I
            gravitate toward people who take responsibility for their path and want to build
            something meaningful, even when it&apos;s hard.{" "}
            <span className="serif-italic" style={{ color: "var(--muted)", fontSize: "1.05em" }}>
              I think technology fails most often not because it&apos;s too complex, but because
              it forgets who it&apos;s for. I&apos;m intentional about not making that mistake.
            </span>
          </p>
          <motion.div initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }}
            transition={{ duration: 1, delay: 0.3 }} viewport={{ once: true }}
            style={{ height: 1, marginTop: "3rem", transformOrigin: "center",
              background: "linear-gradient(to right, transparent, rgba(201,168,124,0.2), transparent)" }} />
        </motion.div>
      </div>
    </section>
  );
}
