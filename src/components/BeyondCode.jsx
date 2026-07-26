"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

export default function BeyondCode() {
  const headRef = useRef(null);
  // progress across the heading's pin zone only — this drives the reveal,
  // and touches nothing about the story (which lives in normal flow below)
  const { scrollYProgress } = useScroll({
    target: headRef,
    offset: ["start start", "end start"],
    layoutEffect: false,
  });
  // the heading shrinks and drifts DOWN toward the story as you scroll,
  // so it leads into the text instead of flying away — feels continuous
  const scale = useTransform(scrollYProgress, [0, 0.85], [1.15, 0.55]);
  const opacity = useTransform(scrollYProgress, [0.55, 0.9], [1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.85], [0, 120]);

  return (
    <section id="BeyondCode" style={{ position: "relative" }}>
      {/* ember warmth: this section's one atmospheric element */}
      <div style={{ position: "absolute", top: "12%", right: "5%", width: "34vw", height: "34vw",
        background: "radial-gradient(circle, rgba(180,85,45,0.045), transparent 60%)",
        filter: "blur(50px)", pointerEvents: "none" }} />

      {/* ghost script watermark */}
      <span aria-hidden className="watermark" style={{
        left: "-4%", top: "6rem", fontSize: "clamp(12rem, 30vw, 28rem)" }}>
        భ
      </span>

      {/* ——— the reveal: a pinned heading that scales and fades as you scroll ——— */}
      <div ref={headRef} style={{ position: "relative", height: "115vh" }}>
        <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden",
          display: "flex", alignItems: "center", justifyContent: "center",
          padding: "0 var(--gutter)" }}>
          <div className="section-head" style={{
            position: "absolute", top: "2.5rem", left: "var(--gutter)", right: "var(--gutter)", marginBottom: 0 }}>
            <div className="rule" />
            <span className="label">Story</span>
            <div className="dots" />
            <span className="numeral">04 · ೦೪</span>
          </div>
          <motion.h2 className="serif-italic" style={{
            scale, opacity, y, textAlign: "center", pointerEvents: "none",
            marginTop: "clamp(6rem, 20vh, 15rem)",
            fontSize: "clamp(4.5rem, 14vw, 15rem)", fontWeight: 340, lineHeight: 0.9,
            letterSpacing: "-0.02em", color: "var(--gold)" }}>
            Beyond<br />code
          </motion.h2>
        </div>
      </div>

      {/* ——— the story: normal flow, always fully visible at any scroll speed ——— */}
      <div style={{ maxWidth: 560, margin: "0 auto", padding: "0 var(--gutter) clamp(6rem, 14vh, 10rem)" }}>
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          viewport={{ once: true, margin: "-10% 0px" }}>
          <p style={{ fontSize: "clamp(0.95rem, 1.05vw, 1.1rem)", color: "var(--cream)",
            lineHeight: 1.85, fontWeight: 400, textAlign: "center" }}>
            Tanzania is my home. Not just where I lived, it&apos;s{" "}
            <span style={{ color: "var(--gold)", fontWeight: 500 }}>home</span>. Growing up
            there shaped everything about how I see the world. It gave me a global perspective,
            taught me adaptability, and showed me that there are so many different ways of life,
            all valid, all valuable. I&apos;ve been doing Bharatanatyam since I was four. 12+
            years as my shelter, my way to connect with myself. Dance taught me discipline,
            patience, precision. This art form reminds me that AI, like dance, needs{" "}
            <span style={{ color: "var(--gold)", fontWeight: 500 }}>
              creativity, nuance, and a willingness to interpret the world in new ways
            </span>. I&apos;m optimistic by default, not superficially, but in the sense that I
            believe most problems can be worked through with enough curiosity and effort. I
            gravitate toward people who take responsibility for their path and want to build
            something meaningful, even when it&apos;s hard.{" "}
            <span className="serif-italic" style={{ color: "#ddd5c9", fontSize: "1.05em" }}>
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
