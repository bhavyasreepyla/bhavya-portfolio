"use client";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useMemo } from "react";

const LINES = [
  { text: "You're probably here because you're trying to understand who I am beyond bullet points and project descriptions." },
  { text: "I value clarity, honesty, and doing work that actually matters.", highlight: "I care about impact, thoughtfulness, and responsibility." },
  { text: "I'm still learning, still growing, and still figuring out what kind of engineer and researcher I want to become. But I know I want to work on problems that require both technical depth and human understanding." },
  { text: "If that resonates with you, I'd love to talk.", isAccent: true },
];

/* One word, lit by scroll — the letter reads itself to you. */
function Word({ word, progress, range, accent, highlight }) {
  const opacity = useTransform(progress, range, [0.08, 1]);
  return (
    <motion.span
      className={accent || highlight ? "serif-italic" : undefined}
      style={{
        opacity,
        color: accent ? "var(--gold)" : highlight ? "var(--cream)" : "#c4bcb0",
        fontSize: accent ? "1.25em" : highlight ? "1.06em" : undefined,
      }}>
      {word}{" "}
    </motion.span>
  );
}

export default function Letter() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"], layoutEffect: false });
  const lineW = useTransform(scrollYProgress, [0.2, 0.5], ["0%", "100%"]);

  // flatten the letter into words, each assigned a slice of scroll progress
  const words = useMemo(() => {
    const out = [];
    LINES.forEach((line, li) => {
      line.text.split(" ").forEach((w) => out.push({ w, accent: !!line.isAccent, highlight: false, li }));
      if (line.highlight) line.highlight.split(" ").forEach((w) => out.push({ w, accent: false, highlight: true, li }));
    });
    const total = out.length;
    return out.map((item, i) => ({
      ...item,
      range: [0.12 + (i / total) * 0.38, 0.12 + (i / total) * 0.38 + 0.035],
    }));
  }, []);

  const paragraphs = useMemo(() => {
    const groups = [];
    words.forEach((item) => {
      if (!groups[item.li]) groups[item.li] = [];
      groups[item.li].push(item);
    });
    return groups;
  }, [words]);

  return (
    <section id="Letter" ref={ref} style={{
      position: "relative", padding: "clamp(6rem, 14vh, 10rem) var(--gutter)",
      overflow: "hidden",
    }}>
      <div style={{ maxWidth: 640, margin: "0 auto", position: "relative", zIndex: 1 }}>
        {/* the letter sits on Surface — a page on the desk */}
        <motion.div initial={{ opacity: 0, y: 40 }} whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }} viewport={{ once: true }}
          style={{ background: "var(--surface)", border: "1px solid var(--hairline)",
            borderRadius: 2, padding: "clamp(2.5rem, 6vw, 4.5rem)" }}>

          {/* dateline */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline",
            marginBottom: "2.5rem" }}>
            <span className="numeral">PORTLAND, MAINE</span>
            <span className="numeral">05 · ०५</span>
          </div>

          <h2 style={{ fontWeight: 800, fontSize: "clamp(1.8rem, 3.5vw, 2.6rem)",
            color: "var(--cream)", textAlign: "center", marginBottom: "2.5rem", letterSpacing: "-0.03em" }}>
            If you're reading this<span style={{ color: "var(--gold)" }}>.</span>
          </h2>

          {/* the letter reveals itself word by word as you scroll */}
          {paragraphs.map((group, li) => (
            <p key={li} style={{
              fontSize: group[0].accent ? "clamp(1.05rem, 1.5vw, 1.2rem)" : "clamp(0.95rem, 1.3vw, 1.05rem)",
              lineHeight: 1.9, fontWeight: 300, textAlign: "center",
              marginBottom: li < paragraphs.length - 1 ? "1.6rem" : 0,
            }}>
              {group.map((item, wi) => (
                <Word key={wi} word={item.w} progress={scrollYProgress} range={item.range}
                  accent={item.accent} highlight={item.highlight} />
              ))}
            </p>
          ))}

          {/* signature */}
          <motion.div initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }} viewport={{ once: true }}
            style={{ textAlign: "center", marginTop: "3rem" }}>
            <motion.div style={{ width: lineW, height: 1, margin: "0 auto 2rem",
              background: "linear-gradient(to right, transparent, rgba(201,168,124,0.3), transparent)" }} />
            <p className="serif-italic" style={{ fontSize: "1.6rem", color: "var(--ember)", marginBottom: "0.4rem" }}>
              Bhavya
            </p>
            <p className="numeral" style={{ letterSpacing: "0.3em" }}>భవ్య · भव्या</p>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
