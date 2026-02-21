"use client";
import { motion } from "framer-motion";
import { useState, useRef, useCallback } from "react";

const SKILL_ROWS = [
  { items: "Python · PyTorch · TensorFlow · Keras · OpenCV · YOLO · scikit-learn · NumPy · Pandas · NLTK ·", size: "clamp(2rem, 5vw, 4rem)", speed: 40, reverse: false, opacity: 0.12 },
  { items: "Deep Learning · Computer Vision · NLP · Recommender Systems · Time Series · Multimodal AI · CNN · LSTM · Transformers ·", size: "clamp(3rem, 8vw, 7rem)", speed: 35, reverse: true, opacity: 0.06 },
  { items: "React · Next.js · SQL · AWS · Git · Streamlit · MATLAB · Java · Matplotlib · Pillow ·", size: "clamp(1.5rem, 3.5vw, 2.5rem)", speed: 50, reverse: false, opacity: 0.15 },
  { items: "Machine Learning · Data Engineering · Model Optimization · Feature Engineering · Transfer Learning ·", size: "clamp(1.8rem, 4vw, 3rem)", speed: 45, reverse: true, opacity: 0.1 },
  { items: "YOLOv5 · ResNet-50 · Tesseract OCR · Label Studio · TTS · Wasserstein Distance · Collaborative Filtering ·", size: "clamp(3.5rem, 9vw, 8rem)", speed: 30, reverse: false, opacity: 0.03 },
];

const PROJECTS = [
  {
    title: "Number Plate Detection",
    desc: "Hybrid YOLOv5 + ResNet-50 vehicle classification with Tesseract OCR for plate extraction under varied lighting — built for AP Government",
    witty: "Teaching cameras to read license plates better than most humans can 🚗👀",
    tags: ["YOLOv5", "ResNet-50", "Tesseract OCR", "Label Studio"],
    org: "AP Government", year: "2025",
  },
  {
    title: "Vision-to-Speech System",
    desc: "End-to-end CNN-LSTM encoder-decoder generating natural language captions from images, with TTS synthesis for visually impaired users",
    witty: "Teaching computers to describe the world to those who can't see it 🤖🗣️",
    tags: ["CNN", "LSTM", "TTS", "NUS Singapore"],
    org: "NUS Singapore", year: "2023",
  },
  {
    title: "EV Charging Prediction",
    desc: "CNN feature extraction + LSTM sequence modeling for temporal and spatial pattern learning from large-scale sensor feeds",
    witty: "Predicting where electric cars get hungry before they even know it ⚡🔌",
    tags: ["CNN", "LSTM", "Time Series", "Sensor Data"],
    org: "Mahindra University", year: "2024",
  },
  {
    title: "Hybrid Recommender",
    desc: "Hybrid similarity algorithm combining content-based and collaborative filtering with Wasserstein distance to solve cold-start in sparse data",
    witty: "Netflix-style recs but when you literally have zero data to work with 🍿🤷",
    tags: ["Cold-Start", "Wasserstein", "Collab Filtering"],
    org: "Mahindra University", year: "2025",
  },
];

function ProjectRow({ project, index }) {
  const [hov, setHov] = useState(false);
  const rowRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouse = useCallback((e) => {
    const r = rowRef.current?.getBoundingClientRect();
    if (r) setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

  return (
    <motion.div ref={rowRef} data-hover
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.12, ease: [0.22,1,0.36,1] }}
      viewport={{ once: true }}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      style={{ position: "relative", overflow: "hidden", padding: "3rem 0", cursor: "pointer",
        borderBottom: "1px solid rgba(201,168,124,0.06)", transition: "background 0.4s",
        background: hov ? "rgba(201,168,124,0.015)" : "transparent" }}>

      {/* ghost marquee */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", display: "flex",
        alignItems: "center", pointerEvents: "none", opacity: hov ? 0.07 : 0.02, transition: "opacity 0.4s" }}>
        <div style={{ display: "flex", whiteSpace: "nowrap", width: "max-content",
          animation: `${index % 2 === 0 ? "marquee" : "marqueeR"} 20s linear infinite` }}>
          {[0,1,2,3].map(k => (
            <span key={k} style={{ fontSize: "clamp(4rem, 10vw, 10rem)", fontWeight: 900,
              letterSpacing: "-0.04em", paddingRight: "3rem", color: "#f5f0eb" }}>{project.title}</span>
          ))}
        </div>
      </div>

      {/* spotlight */}
      {hov && <div style={{ position: "absolute", top: mouse.y - 200, left: mouse.x - 200,
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,168,124,0.05), transparent 65%)", pointerEvents: "none" }} />}

      {/* LAYER 1: Normal content */}
      <div style={{ position: "relative", zIndex: 1, display: "flex", alignItems: "center",
        gap: "clamp(1rem, 3vw, 3rem)" }}>
        <span style={{ color: "#5a5a5a", fontSize: "0.55rem", fontFamily: "monospace", letterSpacing: "0.1em", minWidth: 30 }}>(0{index + 1})</span>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)", fontWeight: 800, color: "#f5f0eb",
            letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>{project.title}</h3>
          <p style={{ fontSize: "0.9rem", color: "#8a8580", lineHeight: 1.6, maxWidth: 550, marginBottom: "0.8rem" }}>
            {project.desc}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
            {project.tags.map((t, i) => (
              <span key={i} style={{ fontSize: "0.55rem", fontFamily: "monospace", padding: "0.2rem 0.6rem",
                borderRadius: 4, background: "rgba(201,168,124,0.06)", color: "#c9a87c",
                border: "1px solid rgba(201,168,124,0.1)", letterSpacing: "0.06em" }}>{t}</span>
            ))}
          </div>
        </div>
        <div style={{ textAlign: "right", flexShrink: 0 }}>
          <p style={{ color: "#c9a87c", fontSize: "0.5rem", fontFamily: "monospace", letterSpacing: "0.1em" }}>{project.org}</p>
          <p style={{ color: "#3a3530", fontSize: "0.5rem", fontFamily: "monospace" }}>{project.year}</p>
        </div>
      </div>

      {/* LAYER 2: Witty content (cursor-clipped reveal) */}
      {hov && (
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, bottom: 0, zIndex: 2,
          padding: "3rem 0", pointerEvents: "none",
          clipPath: `circle(90px at ${mouse.x}px ${mouse.y}px)`,
          WebkitClipPath: `circle(90px at ${mouse.x}px ${mouse.y}px)`,
          background: "rgba(25,20,15,0.95)",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: "clamp(1rem, 3vw, 3rem)" }}>
            <span style={{ color: "#c9a87c", fontSize: "0.55rem", fontFamily: "monospace", letterSpacing: "0.1em", minWidth: 30 }}>(0{index + 1})</span>
            <div style={{ flex: 1 }}>
              <h3 style={{ fontSize: "clamp(1.5rem, 4vw, 3.5rem)", fontWeight: 800, color: "#c9a87c",
                letterSpacing: "-0.03em", marginBottom: "0.5rem" }}>{project.title}</h3>
              <p style={{ fontSize: "0.9rem", color: "#e8d5b5", lineHeight: 1.6, maxWidth: 550,
                fontStyle: "italic", marginBottom: "0.8rem" }}>
                {project.witty}
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: "0.35rem" }}>
                {project.tags.map((t, i) => (
                  <span key={i} style={{ fontSize: "0.55rem", fontFamily: "monospace", padding: "0.2rem 0.6rem",
                    borderRadius: 4, background: "rgba(201,168,124,0.15)", color: "#e8d5b5",
                    border: "1px solid rgba(201,168,124,0.3)", letterSpacing: "0.06em" }}>{t}</span>
                ))}
              </div>
            </div>
            <div style={{ textAlign: "right", flexShrink: 0 }}>
              <p style={{ color: "#e8d5b5", fontSize: "0.5rem", fontFamily: "monospace", letterSpacing: "0.1em" }}>{project.org}</p>
              <p style={{ color: "#c9a87c", fontSize: "0.5rem", fontFamily: "monospace" }}>{project.year}</p>
            </div>
          </div>
        </div>
      )}
    </motion.div>
  );
}

export default function WhatIBuild() {
  return (
    <section id="WhatIBuild" style={{ position: "relative", padding: "8rem clamp(2rem, 8vw, 10rem) 6rem",
      background: "#0a0a0a", overflow: "hidden" }}>
      <div style={{ position: "absolute", bottom: "-10%", right: "-5%", width: "50vw", height: "50vw",
        background: "radial-gradient(circle, rgba(201,168,124,0.03), transparent 60%)", filter: "blur(60px)", pointerEvents: "none" }} />
      <div style={{ position: "absolute", inset: 0, opacity: 0.01, pointerEvents: "none",
        backgroundImage: "repeating-linear-gradient(0deg, transparent, transparent 3px, rgba(201,168,124,0.08) 3px, rgba(201,168,124,0.08) 4px)" }} />

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }} viewport={{ once: true }}>
          <div style={{ display: "flex", alignItems: "center", gap: "1rem", marginBottom: "0.8rem" }}>
            <div style={{ width: 50, height: 1, background: "linear-gradient(to right, #c9a87c, transparent)" }} />
            <span style={{ color: "#5a5a5a", fontSize: "0.55rem", letterSpacing: "0.3em", fontFamily: "monospace", textTransform: "uppercase" }}>WORK</span>
          </div>
          <h2 style={{ fontSize: "clamp(3.5rem, 9vw, 9rem)", fontWeight: 900, lineHeight: 0.85,
            letterSpacing: "-0.05em", marginBottom: "1rem", color: "#f5f0eb" }}>
            What I<br/>Build<span style={{ color: "#c9a87c" }}>.</span>
          </h2>
          <p style={{ fontSize: "0.85rem", color: "#8a8580", maxWidth: 440, lineHeight: 1.65, marginBottom: "1.5rem" }}>
            AI that solves real problems. <span style={{ color: "#5a5a5a", fontStyle: "italic" }}>Hover the cards — your cursor reveals the real story underneath.</span>
          </p>
        </motion.div>

        {/* SKILLS MARQUEE */}
        <div style={{ marginBottom: "2rem", position: "relative", overflow: "hidden", padding: "1rem 0",
          maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}>
          {SKILL_ROWS.map((row, i) => (
            <div key={i} style={{ overflow: "hidden", whiteSpace: "nowrap", marginBottom: "0.15rem", lineHeight: 1.1 }}>
              <div style={{ display: "inline-flex", width: "max-content",
                animation: `${row.reverse ? "marqueeR" : "marquee"} ${row.speed}s linear infinite` }}>
                {[0,1,2].map(k => (
                  <span key={k} style={{
                    fontSize: row.size, fontWeight: 900, color: row.opacity < 0.05 ? "transparent" : "#f5f0eb",
                    opacity: row.opacity, letterSpacing: "-0.03em", paddingRight: "2rem",
                    ...(row.opacity < 0.05 ? { WebkitTextStroke: "1px rgba(201,168,124,0.08)" } : {}),
                  }}>{row.items}{" "}</span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* PROJECTS — now 4 rows */}
        {PROJECTS.map((p, i) => <ProjectRow key={i} project={p} index={i} />)}

        <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }} style={{ textAlign: "center", marginTop: "3rem" }}>
          <span data-hover style={{ color: "#5a5a5a", fontSize: "0.55rem", fontFamily: "monospace", letterSpacing: "0.2em", cursor: "pointer" }}>
            VIEW ALL CASE STUDIES →</span>
        </motion.div>
      </div>
    </section>
  );
}