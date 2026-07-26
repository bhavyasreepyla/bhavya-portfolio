"use client";
import { useEffect, useRef, useState } from "react";

/*
 * Buttermax-style cursor: 
 * - Large fluid circle that lags behind with springy physics
 * - mix-blend-mode: difference → inverts whatever is behind it
 * - On hover elements it scales up
 * - Creates that "reveals different color" effect from buttermax
 */
export default function CustomCursor() {
  const blobRef = useRef(null);
  const pos = useRef({ x: -200, y: -200 });
  const target = useRef({ x: -200, y: -200 });
  const vel = useRef({ x: 0, y: 0 });
  const [hov, setHov] = useState(false);

  useEffect(() => {
    const move = (e) => {
      target.current = { x: e.clientX, y: e.clientY };
    };

    // Spring physics for fluid motion
    const tick = () => {
      const dx = target.current.x - pos.current.x;
      const dy = target.current.y - pos.current.y;
      // spring force
      vel.current.x += dx * 0.06;
      vel.current.y += dy * 0.06;
      // damping
      vel.current.x *= 0.75;
      vel.current.y *= 0.75;
      pos.current.x += vel.current.x;
      pos.current.y += vel.current.y;

      if (blobRef.current) {
        // Slight stretch based on velocity for fluid feel
        const speed = Math.sqrt(vel.current.x ** 2 + vel.current.y ** 2);
        const angle = Math.atan2(vel.current.y, vel.current.x) * (180 / Math.PI);
        const stretch = Math.min(speed * 0.015, 0.3);
        blobRef.current.style.transform = 
          `translate(${pos.current.x}px, ${pos.current.y}px) translate(-50%, -50%) rotate(${angle}deg) scale(${1 + stretch}, ${1 - stretch * 0.5})`;
      }
      requestAnimationFrame(tick);
    };

    const scan = () => {
      document.querySelectorAll("a, button, [data-hover]").forEach((el) => {
        el.removeEventListener("mouseenter", onEnter);
        el.removeEventListener("mouseleave", onLeave);
        el.addEventListener("mouseenter", onEnter);
        el.addEventListener("mouseleave", onLeave);
      });
    };
    const onEnter = () => setHov(true);
    const onLeave = () => setHov(false);

    window.addEventListener("mousemove", move);
    requestAnimationFrame(tick);
    scan();
    const iv = setInterval(scan, 2000);

    return () => {
      window.removeEventListener("mousemove", move);
      clearInterval(iv);
    };
  }, []);

  const size = hov ? 120 : 40;

  return (
    <>
      {/* 
       * THE KEY: mix-blend-mode: difference
       * White circle + difference blend = inverts the background beneath it
       * On dark bg → shows white circle. On light text → inverts it.
       * This is exactly the buttermax effect.
       */}
      <div
        ref={blobRef}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          width: size,
          height: size,
          borderRadius: "50%",
          background: "#f5f0eb",
          mixBlendMode: "difference",
          pointerEvents: "none",
          zIndex: 9999,
          transition: "width 0.5s cubic-bezier(0.22,1,0.36,1), height 0.5s cubic-bezier(0.22,1,0.36,1)",
          willChange: "transform",
        }}
      />
      <style jsx global>{`
        @media (pointer: fine) {
          * { cursor: none !important; }
        }
      `}</style>
    </>
  );
}