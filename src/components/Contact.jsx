"use client";
import { motion } from "framer-motion";
import { useState, useEffect } from "react";

export default function Contact() {
  const [time, setTime] = useState("");
  const [dots, setDots] = useState("");
  const [bars, setBars] = useState([]);

  useEffect(() => {
    // Generate bars on client only to avoid hydration mismatch
    setBars(Array.from({ length: 20 }, (_, i) => ({
      left: `${(i * 7) % 100}%`,
      width: `${2 + Math.random() * 8}%`,
      opacity: 0.15 + Math.random() * 0.3,
      dur: 3 + Math.random() * 4,
      delay: Math.random() * 2,
    })));
    const tick = () => {
      const now = new Date();
      setTime(now.toLocaleTimeString("en-US", { hour:"2-digit", minute:"2-digit", second:"2-digit", hour12:false, timeZone:"America/New_York" }));
    };
    tick();
    const iv = setInterval(tick, 1000);
    const dv = setInterval(() => setDots(p => p.length >= 3 ? "" : p + "."), 500);
    return () => { clearInterval(iv); clearInterval(dv); };
  }, []);

  return (
    <section id="Contact" style={{
      position: "relative", padding: "0", background: "#0a0a0a", overflow: "hidden",
      minHeight: "100vh", display: "flex", flexDirection: "column",
    }}>
      <div style={{ position: "absolute", top: "20%", left: "50%", transform: "translateX(-50%)",
        width: "60vw", height: "40vw", background: "radial-gradient(ellipse, rgba(201,168,124,0.04), transparent 60%)",
        filter: "blur(60px)", pointerEvents: "none" }} />

      {/* transition marquee */}
      <div style={{ overflow: "hidden", padding: "1.5rem 0",
        borderTop: "1px solid rgba(201,168,124,0.04)", borderBottom: "1px solid rgba(201,168,124,0.04)",
        background: "rgba(201,168,124,0.008)" }}>
        <div style={{ display: "flex", whiteSpace: "nowrap", width: "max-content",
          animation: "marqueeR 40s linear infinite" }}>
          {[0,1].map(k => (
            <span key={k} style={{ fontSize: "0.55rem", color: "#2a2520", fontWeight: 700,
              letterSpacing: "0.4em", paddingRight: "4rem", fontFamily: "monospace" }}>
              LET'S CONNECT • OPEN TO OPPORTUNITIES • RESEARCH • COLLABORATION • AI FOR GOOD • LET'S BUILD •{" "}
            </span>
          ))}
        </div>
      </div>
      <style jsx global>{`@keyframes marqueeR { from { transform: translateX(-50%); } to { transform: translateX(0); } }`}</style>

      <div style={{ flex: 1, display: "flex", alignItems: "center", padding: "4rem clamp(2rem, 6vw, 8rem)" }}>
        <div style={{ maxWidth: 1200, margin: "0 auto", width: "100%",
          display: "grid", gridTemplateColumns: "1fr 1fr", gap: "clamp(3rem, 8vw, 8rem)", alignItems: "center" }}>

          <motion.div initial={{ opacity: 0, y: 50 }} whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22,1,0.36,1] }} viewport={{ once: true }}>
            <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "1rem" }}>
              <div style={{ width: 50, height: 1, background: "linear-gradient(to right, #c9a87c, transparent)" }} />
              <span style={{ color: "#5a5a5a", fontSize: "0.55rem", letterSpacing: "0.3em", fontFamily: "monospace", textTransform: "uppercase" }}>CONNECT</span>
            </div>
            <h2 style={{ fontSize: "clamp(3rem, 7vw, 7rem)", fontWeight: 900, lineHeight: 0.88,
              letterSpacing: "-0.05em", color: "#f5f0eb", marginBottom: "1.5rem" }}>
              Let's<br/>Build<br/><span style={{ color: "#c9a87c" }}>Something.</span>
            </h2>
            <p style={{ fontSize: "0.9rem", color: "#8a8580", maxWidth: 380, lineHeight: 1.7, marginBottom: "2.5rem" }}>
              Open to opportunities, collaborations, and conversations about AI, research, or interesting problems.
            </p>
            <a data-hover href="mailto:pylabhavyasree1@gmail.com" style={{
              display: "inline-block", padding: "1.1rem 3rem", fontSize: "0.7rem", fontWeight: 700,
              color: "#0a0a0a", background: "#c9a87c", borderRadius: 6, textDecoration: "none",
              fontFamily: "monospace", letterSpacing: "0.15em", textTransform: "uppercase",
              boxShadow: "0 10px 35px rgba(201,168,124,0.2)", transition: "transform 0.3s, box-shadow 0.3s",
            }}
            onMouseEnter={e=>{e.currentTarget.style.transform="translateY(-3px)";e.currentTarget.style.boxShadow="0 14px 45px rgba(201,168,124,0.35)"}}
            onMouseLeave={e=>{e.currentTarget.style.transform="translateY(0)";e.currentTarget.style.boxShadow="0 10px 35px rgba(201,168,124,0.2)"}}
            >Get in Touch →</a>
          </motion.div>

          <motion.div initial={{ opacity: 0, x: 40 }} whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }} viewport={{ once: true }}
            style={{ border: "1px solid rgba(201,168,124,0.08)", borderRadius: 12, padding: "2.5rem",
              background: "rgba(201,168,124,0.01)", backdropFilter: "blur(4px)" }}>
            <div style={{ display: "flex", alignItems: "center", gap: "0.5rem", marginBottom: "2rem" }}>
              <div style={{ width: 6, height: 6, borderRadius: "50%", background: "#4ade80",
                boxShadow: "0 0 8px rgba(74,222,128,0.5)", animation: "blink 2s ease-in-out infinite" }} />
              <span style={{ color: "#4ade80", fontSize: "0.55rem", fontFamily: "monospace", letterSpacing: "0.15em" }}>
                AVAILABLE FOR WORK{dots}
              </span>
            </div>
            {[
              ["LOCATION", "Portland, Maine, US"],
              ["LOCAL TIME", time + " EST"],
              ["PROGRAM", "MS AI @ Northeastern"],
              ["EMAIL", "pylabhavyasree1@gmail.com"],
            ].map(([label, val], i) => (
              <div key={i} style={{
                display: "flex", justifyContent: "space-between", alignItems: "center",
                padding: "0.6rem 0",
                borderBottom: i < 3 ? "1px solid rgba(201,168,124,0.04)" : "none",
              }}>
                <span style={{ color: "#5a5a5a", fontSize: "0.5rem", fontFamily: "monospace", letterSpacing: "0.15em" }}>{label}</span>
                <span style={{ color: label === "EMAIL" ? "#c9a87c" : "#8a8580", fontSize: "0.6rem",
                  fontFamily: "monospace", letterSpacing: "0.05em", textAlign: "right" }}>{val}</span>
              </div>
            ))}
            <div style={{ marginTop: "1.5rem", display: "flex", gap: "1.5rem" }}>
              {[["https://github.com/bhavyasreepyla","GITHUB"],["https://linkedin.com/in/bhavyasreepyla","LINKEDIN"]].map(([h,l]) => (
                <a key={l} data-hover href={h} target="_blank" rel="noopener noreferrer"
                  style={{ color: "#5a5a5a", fontSize: "0.5rem", fontFamily: "monospace",
                    letterSpacing: "0.15em", textDecoration: "none", transition: "color 0.3s" }}
                  onMouseEnter={e=>e.target.style.color="#c9a87c"}
                  onMouseLeave={e=>e.target.style.color="#5a5a5a"}>{l} ↗</a>
              ))}
            </div>
          </motion.div>
        </div>
      </div>

      {/* darkroom bars — client-only rendered */}
      <div style={{ position: "relative", padding: "3rem clamp(2rem, 6vw, 8rem)", overflow: "hidden" }}>
        {bars.length > 0 && (
          <div style={{ position: "absolute", inset: 0, overflow: "hidden", opacity: 0.12, pointerEvents: "none" }}>
            {bars.map((bar, i) => (
              <div key={i} style={{
                position: "absolute", left: bar.left, top: 0, bottom: 0,
                width: bar.width, background: "#c9a87c", opacity: bar.opacity,
                animation: `barPulse ${bar.dur}s ease-in-out ${bar.delay}s infinite alternate`,
              }} />
            ))}
          </div>
        )}
        <div style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto",
          display: "flex", justifyContent: "space-between", flexWrap: "wrap", gap: "1rem",
          borderTop: "1px solid rgba(201,168,124,0.06)", paddingTop: "2rem" }}>
          <span style={{ color: "#2a2520", fontSize: "0.5rem", fontFamily: "monospace", letterSpacing: "0.15em" }}>© 2026 BHAVYA SREE PYLA</span>
          <span style={{ color: "#2a2520", fontSize: "0.5rem", fontFamily: "monospace", letterSpacing: "0.15em" }}>DESIGNED & BUILT WITH CARE</span>
          <span style={{ color: "#2a2520", fontSize: "0.5rem", fontFamily: "monospace", letterSpacing: "0.15em" }}>ALL RIGHTS RESERVED</span>
        </div>
      </div>
      <style jsx>{`
        @keyframes blink { 0%,100% { opacity: 1; } 50% { opacity: 0.3; } }
        @keyframes barPulse { 0% { transform: scaleY(0.3); } 100% { transform: scaleY(1); } }
      `}</style>
    </section>
  );
}