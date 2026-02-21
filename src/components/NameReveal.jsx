"use client";
import { useState, useEffect, useRef } from "react";

const TARGET = "BHAVYA";

const SCRIPTS = [
  "भव्यासुंदरशक्ति",
  "భవ్యసుందరశక్తి",
  "بهافياقوةجمال",
  "ブハヴィヤサクラ",
  "뷔하브야사쿠라",
  "ΞΨΩΣΔΦΓΛ",
  "БХАВЯСКРД",
  "ꦧꦲꦮꦪꦱꦏꦫ",
];

const ALL_CHARS = SCRIPTS.join("");
const rand = () => ALL_CHARS[Math.floor(Math.random() * ALL_CHARS.length)];

export default function NameReveal({ onComplete }) {
  const [display, setDisplay] = useState(Array(TARGET.length).fill(" "));
  const [opacity, setOpacity] = useState(1);
  const resolvedRef = useRef(Array(TARGET.length).fill(false));
  const doneRef = useRef(false);

  useEffect(() => {
    // Fast scramble loop
    const scramble = setInterval(() => {
      if (doneRef.current) return;
      setDisplay(
        TARGET.split("").map((ch, i) =>
          resolvedRef.current[i] ? ch : rand()
        )
      );
    }, 50);

    // Resolve each letter one by one
    TARGET.split("").forEach((_, i) => {
      setTimeout(() => {
        resolvedRef.current[i] = true;
      }, 600 + i * 320);
    });

    // Stop scramble, show final
    const stopTime = 600 + TARGET.length * 320 + 150;
    const stop = setTimeout(() => {
      doneRef.current = true;
      clearInterval(scramble);
      setDisplay(TARGET.split(""));
    }, stopTime);

    // Fade out
    const fadeOut = setTimeout(() => {
      setOpacity(0);
    }, stopTime + 800);

    // Call onComplete
    const complete = setTimeout(() => {
      onComplete?.();
    }, stopTime + 1400);

    return () => {
      clearInterval(scramble);
      clearTimeout(stop);
      clearTimeout(fadeOut);
      clearTimeout(complete);
    };
  }, []); // empty deps — runs exactly once

  return (
    <div
      style={{
        position: "fixed", inset: 0, zIndex: 100,
        display: "flex", alignItems: "center", justifyContent: "center",
        flexDirection: "column", gap: "2rem",
        background: "#0a0a0a",
        opacity,
        transition: "opacity 0.7s cubic-bezier(0.22,1,0.36,1)",
        pointerEvents: opacity < 0.5 ? "none" : "auto",
      }}
    >
      <div style={{ display: "flex", gap: "0.04em" }}>
        {display.map((ch, i) => (
          <span
            key={i}
            style={{
              fontSize: "clamp(4rem, 15vw, 16rem)",
              fontWeight: 900,
              letterSpacing: "-0.04em",
              lineHeight: 1,
              display: "inline-block",
              color: resolvedRef.current[i] ? "#f5f0eb" : "#c9a87c",
              minWidth: "0.55em",
              textAlign: "center",
              transition: "color 0.15s",
            }}
          >
            {ch}
          </span>
        ))}
      </div>

      <div style={{
        width: "min(300px, 60vw)", height: 1,
        background: "rgba(201,168,124,0.15)",
        overflow: "hidden",
      }}>
        <div style={{
          height: "100%",
          background: "linear-gradient(90deg, #c9a87c, #e8d5b5)",
          transition: "width 0.3s ease-out",
        }} />
      </div>
    </div>
  );
}