"use client";
import { motion } from "framer-motion";

const EXPERIENCE = [
  {
    period: "FEB 2026 → PRESENT",
    role: "Research Assistant · Vision-Language Models in Biomedicine",
    org: "NORTHEASTERN UNIVERSITY · PORTLAND, ME",
    desc: "Building and adapting AI models for automated medical image interpretation: data pipeline design, dataset construction, and performance testing across model versions. Researching multi-modal systems that combine imagery and text within an interdisciplinary diagnostic research team.",
    tags: ["Vision-Language Models", "Multimodal AI", "Biomedicine"],
  },
  {
    period: "JAN 2025 → AUG 2025",
    role: "Artificial Intelligence Intern",
    org: "RUBUS DIGITAL · HYDERABAD, INDIA",
    desc: "Drove end-to-end ANPR (automatic number-plate recognition) systems toward large-scale surveillance deployment, partnering with engineering teams to strengthen and streamline the full pipeline. Built scalable multi-camera analytics that raised tracking reliability and ID accuracy by 25%, and cut inference latency by 20% for real-time processing across varied lighting and traffic conditions.",
    tags: ["Object Detection", "ANPR", "Inference Optimization"],
  },
  {
    period: "JUL 2024 → SEP 2024",
    role: "Artificial Intelligence Intern",
    org: "RUBUS DIGITAL · HYDERABAD, INDIA",
    desc: "Trained YOLOv8 object-detection models for traffic monitoring with DeepSORT multi-object tracking; increased license-plate detection accuracy by 30% by combining Haar cascade methods with CNN-based refinement; built and annotated a large-scale traffic dataset with augmentation.",
    tags: ["YOLOv8", "DeepSORT", "Computer Vision"],
  },
  {
    period: "JUL 2023 → AUG 2023",
    role: "Deep Learning Intern",
    org: "NATIONAL UNIVERSITY OF SINGAPORE",
    desc: "Built an end-to-end vision-to-speech system: a CNN-LSTM encoder-decoder generating natural-language image captions, with TTS synthesis supporting non-visual information access.",
    tags: ["CNN", "LSTM", "TTS"],
  },
];

const EDUCATION = [
  {
    period: "2025 → 2027",
    role: "MS in Artificial Intelligence",
    org: "NORTHEASTERN UNIVERSITY · KHOURY COLLEGE · PORTLAND, ME",
  },
  {
    period: "2021 → 2025",
    role: "B.Tech in Artificial Intelligence",
    org: "MAHINDRA UNIVERSITY · HYDERABAD, INDIA",
  },
];

function GroupHeader({ label }) {
  return (
    <div style={{ display: "flex", alignItems: "center", gap: "1rem", margin: "3rem 0 0.5rem" }}>
      <span className="label" style={{ color: "var(--gold)" }}>{label}</span>
      <div style={{ flex: 1, height: 1, background: "var(--hairline)" }} />
    </div>
  );
}

function EntryRow({ entry, index }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.06, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      style={{ display: "grid", gridTemplateColumns: "minmax(110px, 160px) 1fr", gap: "1.5rem",
        padding: "1.6rem 0", borderBottom: "1px solid var(--hairline)", alignItems: "start" }}>

      <span className="numeral" style={{ color: "var(--gold)", letterSpacing: "0.16em", lineHeight: 1.6 }}>
        {entry.period}
      </span>

      <div>
        <h3 style={{ fontWeight: 700, fontSize: "clamp(1.05rem, 1.5vw, 1.3rem)",
          color: "var(--cream)", marginBottom: "0.3rem" }}>
          {entry.role}
        </h3>
        <p className="numeral" style={{ color: "var(--muted)", letterSpacing: "0.14em",
          marginBottom: entry.desc ? "0.6rem" : 0 }}>
          {entry.org}
        </p>
        {entry.desc && (
          <p style={{ fontSize: "0.9rem", color: "var(--muted)", fontWeight: 300, lineHeight: 1.7,
            maxWidth: 620, marginBottom: entry.tags?.length ? "0.7rem" : 0 }}>
            {entry.desc}
          </p>
        )}
        {entry.tags?.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {entry.tags.map((t) => <span key={t} className="chip">{t}</span>)}
          </div>
        )}
      </div>
    </motion.div>
  );
}

export default function Experience() {
  return (
    <section id="Experience" style={{ position: "relative",
      padding: "clamp(6rem, 14vh, 10rem) var(--gutter)", overflow: "hidden" }}>

      {/* ghost script watermark */}
      <span aria-hidden className="watermark" style={{
        right: "-3%", top: "4rem", fontSize: "clamp(12rem, 28vw, 26rem)" }}>
        య
      </span>

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }}>
          <div className="section-head">
            <div className="rule" />
            <span className="label">Experience</span>
            <div className="dots" />
            <span className="numeral">03 · ٠٣</span>
          </div>
          <h2 className="display-title" style={{ marginBottom: "1rem" }}>
            Where I've <span className="serif-italic" style={{ color: "var(--gold)", fontWeight: 340 }}>been</span>
            <span style={{ color: "var(--gold)" }}>.</span>
          </h2>
        </motion.div>

        <GroupHeader label="Experience" />
        {EXPERIENCE.map((entry, i) => <EntryRow key={entry.period} entry={entry} index={i} />)}

        <GroupHeader label="Education" />
        {EDUCATION.map((entry, i) => <EntryRow key={entry.period} entry={entry} index={i} />)}
      </div>
    </section>
  );
}
