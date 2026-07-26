"use client";
import { useRef, useState, useEffect, useCallback } from "react";

/*
 * The name reveal's scramble, miniaturized into a hover micro-interaction.
 * Wrap any short label: on hover it cycles through the eight scripts
 * before settling back — same DNA as the intro.
 */
const CHARS = "भव्यసుందరశக்திبهافياΞΨΩΣΔБХАВЯꦧꦲꦮ";
const rand = () => CHARS[Math.floor(Math.random() * CHARS.length)];

export default function ScrambleText({ text, ...rest }) {
  const [display, setDisplay] = useState(text);
  const timer = useRef(null);

  useEffect(() => {
    setDisplay(text);
    return () => clearInterval(timer.current);
  }, [text]);

  const scramble = useCallback(() => {
    clearInterval(timer.current);
    let frame = 0;
    const total = text.length * 3;
    timer.current = setInterval(() => {
      frame++;
      const resolved = Math.floor(frame / 3);
      setDisplay(
        text.split("").map((ch, i) =>
          ch === " " ? " " : i < resolved ? ch : rand()
        ).join("")
      );
      if (frame >= total) {
        clearInterval(timer.current);
        setDisplay(text);
      }
    }, 28);
  }, [text]);

  return (
    <span {...rest} onMouseEnter={scramble} style={{ display: "inline-block", ...rest.style }}>
      {display}
    </span>
  );
}
