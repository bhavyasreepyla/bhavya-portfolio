"use client";
import { motion, useScroll, useTransform, useMotionValueEvent } from "framer-motion";
import { useRef, useState, useEffect } from "react";

const ITEMS = [
  {
    n: "01", alt: "०१", title: "User experience", sub: "over metrics",
    desc: "Numbers lie. The person using your system never does.",
    note: "Vision-to-Speech: built for people who'd never see the UI",
  },
  {
    n: "02", alt: "౦౨", title: "Simplicity", sub: "over complexity",
    desc: "If you can't explain it simply, you don't understand it deeply enough.",
    note: "Hybrid Recommender: the simplest model won",
  },
  {
    n: "03", alt: "٠٣", title: "AI amplifies", sub: "not replaces",
    desc: "The best systems make humans more capable, not more replaceable.",
    note: "Number Plate Detection: an officer's whole day, automated",
  },
  {
    n: "04", alt: "೦೪", title: "Endurance", sub: "over excuses",
    desc: "Talent gets you started. Showing up every single day gets you there.",
    note: "Bharatanatyam: the same adavu, twelve years",
  },
];

const STEP_VH = 115;           // scroll distance per drum step
const ANGLE = 52;              // degrees between items on the drum
const RADIUS = 44;             // drum radius in vh

/*
 * Active Theory "spine" — a vertical drum carousel.
 * Every principle is mounted on the same 3D cylinder. Scroll rotates
 * the drum: the next item rolls up from the bottom edge tilted back,
 * unfolds flat at center, then folds away over the top. Neighbors stay
 * visible at an angle above and below — that's the spine.
 */
function DrumItem({ item, i, total, progress }) {
  // signed distance from the drum's focal position
  const delta = useTransform(progress, (v) => i - v * (total - 1));

  const rad = (d) => (d * ANGLE * Math.PI) / 180;
  const y = useTransform(delta, (d) => `${Math.sin(rad(d)) * RADIUS}vh`);
  const z = useTransform(delta, (d) => `${(Math.cos(rad(d)) - 1) * RADIUS}vh`);
  const rotateX = useTransform(delta, (d) => -d * ANGLE);
  const opacity = useTransform(delta, (d) => Math.max(0, 1 - Math.abs(d) * 0.5));
  // details only exist at the focal plane
  const detailOp = useTransform(delta, (d) => Math.max(0, 1 - Math.abs(d) * 2.4));
  const ghostOp = useTransform(delta, (d) => Math.max(0, 0.5 - Math.abs(d) * 0.45));

  return (
    <motion.div style={{
      position: "absolute", inset: 0,
      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center",
      y, z, rotateX, opacity,
      transformStyle: "preserve-3d",
      pointerEvents: "none", willChange: "transform, opacity",
    }}>
      {/* ghost native-script numeral riding the same drum plate */}
      <motion.span aria-hidden style={{ opacity: ghostOp,
        position: "absolute", fontSize: "clamp(11rem, 34vw, 30rem)", fontWeight: 900,
        lineHeight: 1, color: "transparent",
        WebkitTextStroke: "1.5px rgba(201,168,124,0.13)",
        transform: `translateX(${i % 2 === 0 ? "22vw" : "-22vw"})` }}>
        {item.alt}
      </motion.span>

      <span className="numeral" style={{ color: "var(--gold)", letterSpacing: "0.3em",
        marginBottom: "1.4rem" }}>
        ( {item.n} · {item.alt} )
      </span>
      <h3 style={{ fontWeight: 900, fontSize: "clamp(3rem, 8.5vw, 7.5rem)", lineHeight: 0.92,
        letterSpacing: "-0.04em", color: "var(--cream)", marginBottom: "0.4rem", textAlign: "center" }}>
        {item.title}
      </h3>
      <p className="serif-italic" style={{ fontSize: "clamp(1.8rem, 4.2vw, 3.6rem)",
        color: "var(--gold)", letterSpacing: "-0.01em", marginBottom: "1.8rem", textAlign: "center" }}>
        {item.sub}
      </p>

      <motion.div style={{ opacity: detailOp, textAlign: "center" }}>
        <p style={{ fontSize: "clamp(0.9rem, 1.2vw, 1.05rem)", color: "var(--muted)",
          maxWidth: 460, lineHeight: 1.75, fontWeight: 300, margin: "0 auto 1.1rem" }}>
          {item.desc}
        </p>
        <p className="numeral" style={{ letterSpacing: "0.14em", color: "var(--faint)" }}>
          <span style={{ color: "var(--gold)" }}>▸</span> FIELD-TESTED&nbsp;&nbsp;{item.note.toUpperCase()}
        </p>
      </motion.div>
    </motion.div>
  );
}

export default function HowIThink() {
  const ref = useRef(null);
  const [active, setActive] = useState(0);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end end"], layoutEffect: false });
  useMotionValueEvent(scrollYProgress, "change", (v) => {
    setActive(Math.max(0, Math.min(ITEMS.length - 1, Math.round(v * (ITEMS.length - 1)))));
  });

  const scrollCue = useTransform(scrollYProgress, [0, 0.12], [1, 0]);

  const stepTop = (i) => {
    const sec = ref.current;
    return sec.offsetTop + (i / (ITEMS.length - 1)) * (sec.offsetHeight - window.innerHeight);
  };

  const jumpTo = (i) => { if (ref.current) window.scrollTo({ top: stepTop(i), behavior: "smooth" }); };

  // AT-style snap: when scrolling rests inside the drum, ease to the nearest step
  useEffect(() => {
    let t;
    const onScroll = () => {
      clearTimeout(t);
      t = setTimeout(() => {
        const sec = ref.current;
        if (!sec) return;
        const span = sec.offsetHeight - window.innerHeight;
        const local = window.scrollY - sec.offsetTop;
        if (local < 0 || local > span) return;
        const nearest = Math.round((local / span) * (ITEMS.length - 1));
        const target = stepTop(nearest);
        if (Math.abs(target - window.scrollY) > 4) {
          window.scrollTo({ top: target, behavior: "smooth" });
        }
      }, 220);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { clearTimeout(t); window.removeEventListener("scroll", onScroll); };
  }, []);

  return (
    <section id="HowIThink" ref={ref}
      style={{ position: "relative", height: `${100 + (ITEMS.length - 1) * STEP_VH}vh` }}>
      <div style={{ position: "sticky", top: 0, height: "100vh", overflow: "hidden",
        perspective: "1100px", perspectiveOrigin: "50% 50%" }}>

        {/* drum edge fades — items roll out of darkness and back into it */}
        <div aria-hidden style={{ position: "absolute", inset: 0, zIndex: 2, pointerEvents: "none",
          background: "linear-gradient(to bottom, rgba(12,9,6,0.88) 0%, transparent 22%, transparent 78%, rgba(12,9,6,0.88) 100%)" }} />

        {/* pinned header — the counter is alive */}
        <div style={{ position: "absolute", top: "5.5rem", left: "var(--gutter)", right: "var(--gutter)", zIndex: 3 }}>
          <div className="section-head" style={{ marginBottom: 0 }}>
            <div className="rule" />
            <span className="label">Philosophy · How I Think</span>
            <div className="dots" />
            <span className="numeral" style={{ color: "var(--gold)" }}>
              {ITEMS[active].n} <span style={{ color: "var(--faint)" }}>· {ITEMS[active].alt} / 04</span>
            </span>
          </div>
        </div>

        {/* the drum */}
        <div style={{ position: "absolute", inset: 0, transformStyle: "preserve-3d" }}>
          {ITEMS.map((item, i) => (
            <DrumItem key={item.n} item={item} i={i} total={ITEMS.length} progress={scrollYProgress} />
          ))}
        </div>

        {/* clickable progress rail */}
        <div className="hide-mobile" style={{ position: "absolute", right: "var(--gutter)", top: "50%",
          transform: "translateY(-50%)", display: "flex", flexDirection: "column",
          alignItems: "flex-end", gap: "1.1rem", zIndex: 3 }}>
          {ITEMS.map((item, i) => (
            <div key={item.n} data-hover onClick={() => jumpTo(i)}
              style={{ display: "flex", alignItems: "center", gap: "0.7rem", cursor: "pointer",
                padding: "0.2rem 0" }}>
              <span className="numeral" style={{
                color: i === active ? "var(--gold)" : "var(--faint)",
                transition: "color 0.4s" }}>
                {i === active ? item.title.toUpperCase() : item.n}
              </span>
              <div style={{ width: i === active ? 34 : 14, height: 1,
                background: i === active ? "var(--gold)" : "var(--hairline)",
                transition: "all 0.5s var(--settle)" }} />
            </div>
          ))}
        </div>

        {/* scroll cue — fades once the drum starts turning */}
        <motion.div style={{ opacity: scrollCue, position: "absolute", bottom: "4.5rem", left: "50%",
          transform: "translateX(-50%)", display: "flex", alignItems: "center", gap: "0.6rem", zIndex: 3 }}>
          <span className="numeral" style={{ letterSpacing: "0.35em" }}>KEEP SCROLLING</span>
          <motion.span animate={{ y: [0, 5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
            className="numeral" style={{ color: "var(--gold)" }}>↓</motion.span>
        </motion.div>
      </div>
    </section>
  );
}
