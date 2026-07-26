"use client";
import {
  motion, useMotionValue, useScroll, useVelocity, useSpring,
  useTransform, useAnimationFrame, useInView,
} from "framer-motion";
import { useState, useRef, useCallback } from "react";
import DescentGame from "./DescentGame";

const wrap = (min, max, v) => min + (((v - min) % (max - min)) + (max - min)) % (max - min);

/*
 * Scroll-physics marquee: each row drifts on its own, but scroll velocity
 * pours into it — scroll fast and the wall accelerates and skews with the
 * momentum; scroll up and every row reverses. The page feels physical.
 */
function VelocityRow({ row }) {
  const rowRef = useRef(null);
  const inView = useInView(rowRef, { margin: "15% 0px" }); // idle when off-screen
  const baseX = useMotionValue(0);
  const { scrollY } = useScroll();
  const scrollVelocity = useVelocity(scrollY);
  const smooth = useSpring(scrollVelocity, { damping: 50, stiffness: 400 });
  const velocityFactor = useTransform(smooth, [0, 1000], [0, 5], { clamp: false });
  const skewX = useTransform(smooth, [-1200, 1200], [6, -6]);
  const dir = useRef(row.reverse ? -1 : 1);
  const x = useTransform(baseX, (v) => `${wrap(-50, 0, v)}%`);

  useAnimationFrame((t, delta) => {
    if (!inView) return;
    const vf = velocityFactor.get();
    if (vf < 0) dir.current = row.reverse ? 1 : -1;
    else if (vf > 0) dir.current = row.reverse ? -1 : 1;
    let moveBy = dir.current * (60 / row.speed) * (delta / 1000);
    moveBy += moveBy * Math.abs(vf);
    baseX.set(baseX.get() + moveBy);
  });

  return (
    <div ref={rowRef} style={{ overflow: "hidden", whiteSpace: "nowrap", marginBottom: "0.15rem", lineHeight: 1.1 }}>
      <motion.div style={{ x, skewX, display: "inline-flex", width: "max-content", willChange: "transform" }}>
        {[0, 1].map((k) => (
          <span key={k} style={{
            fontSize: row.size, fontWeight: 900, color: row.opacity < 0.05 ? "transparent" : "var(--cream)",
            opacity: row.opacity, letterSpacing: "-0.03em", paddingRight: "2rem",
            ...(row.opacity < 0.05 ? { WebkitTextStroke: "1px rgba(201,168,124,0.12)" } : {}),
          }}>{row.items}{" "}</span>
        ))}
      </motion.div>
    </div>
  );
}

/* Giant kinetic type wall — rows of the stack scrolling in opposing directions. */
const SKILL_ROWS = [
  { items: "Python · PyTorch · TensorFlow · Keras · OpenCV · YOLO · scikit-learn · NumPy · Pandas · NLTK ·", size: "clamp(2rem, 5vw, 4rem)", speed: 40, reverse: false, opacity: 0.14 },
  { items: "Deep Learning · Computer Vision · NLP · LLMs · RAG · Agentic Systems · Evals · Recommender Systems · Time Series · Multimodal AI · CNN · LSTM · Transformers ·", size: "clamp(3rem, 8vw, 7rem)", speed: 35, reverse: true, opacity: 0.07 },
  { items: "React · Next.js · SQL · AWS · Git · Streamlit · MATLAB · Java · Matplotlib · Pillow ·", size: "clamp(1.5rem, 3.5vw, 2.5rem)", speed: 50, reverse: false, opacity: 0.17 },
  { items: "Machine Learning · Data Engineering · Model Optimization · Feature Engineering · Transfer Learning ·", size: "clamp(1.8rem, 4vw, 3rem)", speed: 45, reverse: true, opacity: 0.12 },
  { items: "YOLOv5 · ResNet-50 · Tesseract OCR · Label Studio · TTS · Wasserstein Distance · Collaborative Filtering ·", size: "clamp(3.5rem, 9vw, 8rem)", speed: 30, reverse: false, opacity: 0.04 },
];

const PROJECTS = [
  {
    title: "Agentic Bug-Finder",
    desc: "Evaluation harness for LLM bug-fixing agents: sandboxed tool loop, held-out grading, variance and cost reporting",
    witty: "Letting AI loose on broken code, then grading its homework 🐛🤖",
    tags: ["LLM Agents", "Evals", "Sandboxing", "Python"],
    org: "Independent Research", year: "2026",
    href: "https://github.com/bhavyasreepyla/agentic-bug-finder",
  },
  {
    title: "Pyla: a Programming Language",
    desc: "Pipeline-first scripting language with a tree-walking interpreter and a bytecode VM, written in pure Python",
    witty: "Yes, I named a programming language after myself 💅",
    tags: ["Language Design", "Interpreters", "Bytecode VM"],
    org: "Independent Research", year: "2026",
    href: "https://github.com/bhavyasreepyla/pyla",
  },
  {
    title: "Pyla-Bench",
    desc: "Can an LLM debug a programming language it has never seen? A novel-language agentic benchmark: Pyla × agentic-bug-finder",
    witty: "Testing AI on a language nobody has ever seen, because I invented it 🧪",
    tags: ["Benchmarks", "LLM Agents", "Novel-Language Eval"],
    org: "Independent Research", year: "2026",
    href: "https://github.com/bhavyasreepyla/pyla-bench",
  },
  {
    title: "LLM-Judge Eval",
    desc: "LLM-as-judge reliability study: Cohen's kappa agreement, position bias, length bias, self-consistency",
    witty: "Putting the AI judge itself on trial ⚖️",
    tags: ["LLM Evals", "Bias Analysis", "Statistics"],
    org: "Independent Research", year: "2026",
    href: "https://github.com/bhavyasreepyla/llm-judge-eval",
  },
  {
    title: "Number Plate Detection",
    desc: "Hybrid YOLOv5 + ResNet-50 vehicle classification with Tesseract OCR for plate extraction under varied lighting",
    witty: "Teaching cameras to read license plates better than most humans can 🚗👀",
    tags: ["YOLOv5", "ResNet-50", "Tesseract OCR", "Label Studio"],
    org: "Rubus Digital", year: "2025",
  },
  {
    title: "Vision-to-Speech System",
    desc: "End-to-end CNN-LSTM encoder-decoder generating natural language captions from images, with TTS synthesis for visually impaired users",
    witty: "Teaching computers to describe the world to those who can't see it 🤖🗣️",
    tags: ["CNN", "LSTM", "TTS"],
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
  const [tapped, setTapped] = useState(false); // touch fallback: tap flips the whole row
  const rowRef = useRef(null);
  const [mouse, setMouse] = useState({ x: 0, y: 0 });

  const handleMouse = useCallback((e) => {
    const r = rowRef.current?.getBoundingClientRect();
    if (r) setMouse({ x: e.clientX - r.left, y: e.clientY - r.top });
  }, []);

  const handleClick = useCallback(() => {
    const isTouch = window.matchMedia("(hover: none)").matches;
    if (isTouch) {
      if (tapped && project.href) {
        window.open(project.href, "_blank", "noopener");
        return;
      }
      setTapped((t) => !t);
    } else if (project.href) {
      window.open(project.href, "_blank", "noopener");
    }
  }, [tapped, project.href]);

  const rowInner = (layer) => {
    const witty = layer === "witty";
    return (
      <div style={{ display: "flex", alignItems: "center", gap: "clamp(1rem, 3vw, 3rem)" }}>
        <span className="numeral" style={{ color: witty ? "var(--gold)" : "var(--faint)", minWidth: 34 }}>
          (0{index + 1})
        </span>
        <div style={{ flex: 1 }}>
          <h3 style={{ fontWeight: 800, fontSize: "clamp(1.6rem, 4vw, 3.4rem)",
            color: witty ? "var(--gold)" : "var(--cream)", letterSpacing: "-0.03em",
            lineHeight: 1.05, marginBottom: "0.6rem" }}>{project.title}</h3>
          <p className={witty ? "serif-italic" : undefined}
            style={{ fontSize: witty ? "1.05rem" : "0.92rem", color: witty ? "var(--gold-bright)" : "var(--muted)",
              lineHeight: 1.65, maxWidth: 560, marginBottom: "0.9rem", fontWeight: 300 }}>
            {witty ? project.witty : project.desc}
          </p>
          <div style={{ display: "flex", flexWrap: "wrap", gap: "0.4rem" }}>
            {project.tags.map((t) => (
              <span key={t} className="chip"
                style={witty ? { borderColor: "rgba(201,168,124,0.35)", color: "var(--gold)" } : undefined}>
                {t}
              </span>
            ))}
          </div>
        </div>
        <div className="hide-mobile" style={{ textAlign: "right", flexShrink: 0 }}>
          <p className="numeral" style={{ color: witty ? "var(--gold-bright)" : "var(--gold)", marginBottom: 4 }}>{project.org}</p>
          <p className="numeral">{project.year}</p>
          {project.href && (
            <p className="numeral" style={{ color: "var(--gold)", marginTop: 4 }}>GITHUB ↗</p>
          )}
        </div>
      </div>
    );
  };

  return (
    <motion.div ref={rowRef} data-hover
      initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] }}
      viewport={{ once: true }}
      onMouseMove={handleMouse}
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      onClick={handleClick}
      style={{ position: "relative", overflow: "hidden", padding: "3rem 0", cursor: "pointer",
        borderBottom: "1px solid var(--hairline)", transition: "background 0.4s",
        background: hov ? "rgba(201,168,124,0.02)" : "transparent" }}>

      {/* ghost title marquee — wakes up under the cursor */}
      <div style={{ position: "absolute", inset: 0, overflow: "hidden", display: "flex",
        alignItems: "center", pointerEvents: "none", opacity: hov ? 0.09 : 0.02, transition: "opacity 0.4s" }}>
        <div style={{ display: "flex", whiteSpace: "nowrap", width: "max-content",
          animation: `marquee 20s linear infinite ${index % 2 === 0 ? "normal" : "reverse"}` }}>
          {[0, 1, 2, 3].map((k) => (
            <span key={k} style={{ fontSize: "clamp(4rem, 10vw, 10rem)", fontWeight: 900,
              letterSpacing: "-0.04em", paddingRight: "3rem", color: "var(--cream)" }}>{project.title}</span>
          ))}
        </div>
      </div>

      {/* cursor spotlight */}
      {hov && <div style={{ position: "absolute", top: mouse.y - 200, left: mouse.x - 200,
        width: 400, height: 400, borderRadius: "50%",
        background: "radial-gradient(circle, rgba(201,168,124,0.06), transparent 65%)", pointerEvents: "none" }} />}

      {/* LAYER 1: the record */}
      <div style={{ position: "relative", zIndex: 1 }}>{rowInner("normal")}</div>

      {/* LAYER 2: the aside — cursor circle on desktop, full row on touch */}
      {(hov || tapped) && (
        <div style={{
          position: "absolute", inset: 0, zIndex: 2,
          padding: "3rem 0", pointerEvents: "none",
          ...(tapped ? {} : {
            clipPath: `circle(95px at ${mouse.x}px ${mouse.y}px)`,
            WebkitClipPath: `circle(95px at ${mouse.x}px ${mouse.y}px)`,
          }),
          background: "#1e1710",
        }}>
          {rowInner("witty")}
        </div>
      )}
    </motion.div>
  );
}

export default function WhatIBuild() {
  const [showAll, setShowAll] = useState(false);
  return (
    <section id="WhatIBuild" style={{ position: "relative",
      padding: "clamp(6rem, 14vh, 10rem) var(--gutter)", overflow: "hidden" }}>

      {/* ghost script watermark */}
      <span aria-hidden className="watermark" style={{
        left: "-3%", top: "4rem", fontSize: "clamp(12rem, 28vw, 26rem)" }}>
        వ్య
      </span>

      <div style={{ maxWidth: 1200, margin: "0 auto", position: "relative", zIndex: 1 }}>
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }}>
          <div className="section-head">
            <div className="rule" />
            <span className="label">Work</span>
            <div className="dots" />
            <span className="numeral">02 · ౦౨</span>
          </div>
          <h2 className="display-title" style={{ marginBottom: "1.2rem" }}>
            What I <span className="serif-italic" style={{ color: "var(--gold)", fontWeight: 340 }}>build</span>
            <span style={{ color: "var(--gold)" }}>.</span>
          </h2>
          <p style={{ fontSize: "0.95rem", color: "var(--muted)", maxWidth: 460, lineHeight: 1.7,
            fontWeight: 300, marginBottom: "2rem" }}>
            AI that solves real problems.{" "}
            <span className="serif-italic" style={{ color: "var(--faint)" }}>
              Hover a project (or tap, on touch) and the real story is underneath.
            </span>
          </p>
        </motion.div>

        {/* KINETIC TYPE WALL */}
        <div style={{ marginBottom: "3rem", position: "relative", overflow: "hidden", padding: "1rem 0",
          maskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)",
          WebkitMaskImage: "linear-gradient(to right, transparent, black 5%, black 95%, transparent)" }}>
          {SKILL_ROWS.map((row, i) => (
            <VelocityRow key={i} row={row} />
          ))}
        </div>

        {/* PROJECTS */}
        <div style={{ borderTop: "1px solid var(--hairline)" }}>
          {(showAll ? PROJECTS : PROJECTS.slice(0, 4)).map((p, i) => <ProjectRow key={p.title} project={p} index={i} />)}
        </div>

        <div style={{ textAlign: "center", marginTop: "2.5rem" }}>
          <button data-hover className="btn btn--ghost" onClick={() => setShowAll((s) => !s)}>
            {showAll ? "Show Fewer" : `View All Projects (${PROJECTS.length})`}{" "}
            <span style={{ color: "var(--gold)" }}>{showAll ? "▴" : "▾"}</span>
          </button>
        </div>

        {/* the playground: gradient descent, but you hold the learning rate */}
        <div style={{ textAlign: "center", marginTop: "1.4rem" }}>
          <DescentGame />
        </div>
      </div>
    </section>
  );
}
