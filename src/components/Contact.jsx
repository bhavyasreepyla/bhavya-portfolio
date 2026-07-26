"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";
import Magnetic from "./Magnetic";
import ScrambleText from "./ScrambleText";
import Certificates from "./Certificates";

export default function Contact() {
  const [time, setTime] = useState("");
  const [dots, setDots] = useState("");

  useEffect(() => {
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit", second: "2-digit", hour12: false, timeZone: "America/New_York" }));
    };
    tick();
    const iv = setInterval(tick, 1000);
    const dv = setInterval(() => setDots((p) => (p.length >= 3 ? "" : p + ".")), 500);
    return () => { clearInterval(iv); clearInterval(dv); };
  }, []);

  return (
    <section id="Contact" style={{
      position: "relative", background: "var(--canvas)", overflow: "hidden",
      minHeight: "100vh", display: "flex", flexDirection: "column",
      padding: "clamp(6rem, 14vh, 10rem) var(--gutter) 0",
    }}>
      {/* last candle — the section's one atmospheric element */}
      <div style={{ position: "absolute", top: "15%", left: "50%", transform: "translateX(-50%)",
        width: "60vw", height: "40vw", background: "radial-gradient(ellipse, rgba(201,168,124,0.05), transparent 60%)",
        filter: "blur(60px)", pointerEvents: "none" }} />

      <div style={{ flex: 1, display: "flex", alignItems: "center", position: "relative", zIndex: 1 }}>
        <div className="two-col" style={{ maxWidth: 1200, margin: "0 auto", width: "100%" }}>

          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }}>
            <div className="section-head">
              <div className="rule" />
              <span className="label">Connect</span>
              <div className="dots" />
              <span className="numeral">06 · ౦౬</span>
            </div>
            <h2 className="display-title" style={{ marginBottom: "1.6rem" }}>
              Let's build<br />
              <span className="serif-italic" style={{ color: "var(--gold)" }}>something</span>
              <span style={{ color: "var(--gold)" }}>.</span>
            </h2>
            <p style={{ fontSize: "0.95rem", color: "var(--muted)", maxWidth: 400, lineHeight: 1.75,
              fontWeight: 300, marginBottom: "2.5rem" }}>
              Open to opportunities, collaborations, and conversations about AI, research, or
              interesting problems.
            </p>
            <Magnetic>
              <a data-hover href="mailto:pylabhavyasree1@gmail.com" className="btn">
                <ScrambleText text="Get in Touch" /> <span style={{ color: "var(--gold)" }}>→</span>
              </a>
            </Magnetic>
          </motion.div>

          <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.25, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }}
            style={{ border: "1px solid var(--hairline)", borderRadius: 2, padding: "2.5rem",
              background: "var(--surface)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.6rem", marginBottom: "2rem" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--ember)",
                boxShadow: "0 0 10px rgba(180,85,45,0.6)", animation: "blink 2s ease-in-out infinite" }} />
              <span className="numeral" style={{ color: "var(--gold)", letterSpacing: "0.2em" }}>
                AVAILABLE FOR WORK{dots}
              </span>
            </div>
            {[
              ["LOCATION", "Portland, Maine, US"],
              ["LOCAL TIME", time ? `${time} EST` : "···"],
              ["PROGRAM", "MS AI @ Northeastern"],
              ["EMAIL", "pylabhavyasree1@gmail.com"],
            ].map(([label, val], i) => (
              <div key={label} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center", gap: "1rem",
                padding: "0.75rem 0",
                borderBottom: i < 3 ? "1px solid var(--hairline)" : "none",
              }}>
                <span className="numeral" style={{ letterSpacing: "0.2em", flexShrink: 0 }}>{label}</span>
                <span className="numeral" style={{ color: label === "EMAIL" ? "var(--gold)" : "var(--muted)",
                  textAlign: "right", overflowWrap: "anywhere" }}>{val}</span>
              </div>
            ))}
            <div style={{ marginTop: "1.8rem", display: "flex", gap: "1.8rem", flexWrap: "wrap" }}>
              {[["https://github.com/bhavyasreepyla", "GITHUB"], ["https://linkedin.com/in/bhavyasreepyla", "LINKEDIN"], ["/resume.pdf", "RESUME"]].map(([h, l]) => (
                <a key={l} data-hover href={h} target="_blank" rel="noopener noreferrer"
                  className="numeral" style={{ letterSpacing: "0.2em", textDecoration: "none",
                    color: "var(--muted)", transition: "color 0.3s" }}
                  onMouseEnter={(e) => (e.target.style.color = "var(--gold)")}
                  onMouseLeave={(e) => (e.target.style.color = "var(--muted)")}>{l} ↗</a>
              ))}
              <Certificates />
            </div>
          </motion.div>
        </div>
      </div>

      {/* colophon */}
      <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", width: "100%",
        padding: "3rem 0 2rem" }}>
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <span aria-hidden className="serif-italic" style={{ fontSize: "1.3rem", color: "var(--faint)" }}>
            భవ్య · भव्या · BHAVYA
          </span>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem",
          borderTop: "1px solid var(--hairline)", paddingTop: "1.6rem" }}>
          <span className="numeral" style={{ color: "#3a332b" }}>© 2026 BHAVYA SREE PYLA</span>
          <span className="numeral" style={{ color: "#3a332b" }}>DESIGNED & BUILT WITH CARE</span>
          <span className="numeral" style={{ color: "#3a332b" }}>SET IN FRAUNCES & GEIST</span>
        </div>
      </div>
      <style jsx>{`
        @keyframes blink { 0%, 100% { opacity: 1; } 50% { opacity: 0.3; } }
      `}</style>
    </section>
  );
}
