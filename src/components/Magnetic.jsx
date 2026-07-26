"use client";
import { useRef } from "react";

/* Magnetic wrapper — the element leans toward the cursor and springs back. */
export default function Magnetic({ children, strength = 0.28 }) {
  const ref = useRef(null);

  const onMove = (e) => {
    const el = ref.current;
    if (!el) return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left - r.width / 2) * strength;
    const y = (e.clientY - r.top - r.height / 2) * strength;
    el.style.transform = `translate(${x}px, ${y}px)`;
  };

  const onEnter = () => {
    if (ref.current) ref.current.style.transition = "transform 0.12s ease-out";
  };

  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.transition = "transform 0.6s cubic-bezier(0.22, 1, 0.36, 1)";
    el.style.transform = "translate(0, 0)";
  };

  return (
    <div ref={ref} onMouseMove={onMove} onMouseEnter={onEnter} onMouseLeave={onLeave}
      style={{ display: "inline-block" }}>
      {children}
    </div>
  );
}
