"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useRef } from "react";

/*
 * Credentials vault — a small trigger that opens a manuscript-styled
 * overlay. To make a row clickable, drop the PDF in /public/certificates/
 * and set its `href` below (e.g. "/certificates/nus-deep-learning.pdf").
 */
const CERTS = [
  {
    title: "Data Analytics using Deep Learning",
    issuer: "National University of Singapore",
    href: null,
  },
  {
    title: "Data Analytics using Big Data",
    issuer: "NUS Singapore × AWS",
    href: null,
  },
  {
    title: "MATLAB Certification",
    issuer: "MathWorks",
    href: null,
  },
];

export default function Certificates() {
  const [open, setOpen] = useState(false);
  const panelRef = useRef(null);
  const returnFocusRef = useRef(null);

  useEffect(() => {
    if (!open) return;
    returnFocusRef.current = document.activeElement;
    panelRef.current?.focus();

    const onKey = (e) => {
      if (e.key === "Escape") { setOpen(false); return; }
      // trap Tab inside the dialog
      if (e.key === "Tab" && panelRef.current) {
        const focusables = panelRef.current.querySelectorAll("a[href], button, [tabindex]:not([tabindex='-1'])");
        if (!focusables.length) return;
        const first = focusables[0];
        const last = focusables[focusables.length - 1];
        if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
        else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
      }
    };
    window.addEventListener("keydown", onKey);
    document.body.style.overflow = "hidden";
    return () => {
      window.removeEventListener("keydown", onKey);
      document.body.style.overflow = "";
      returnFocusRef.current?.focus?.();
    };
  }, [open]);

  return (
    <>
      <button data-hover onClick={() => setOpen(true)} className="numeral"
        aria-haspopup="dialog" aria-expanded={open}
        style={{ letterSpacing: "0.2em", cursor: "pointer", color: "var(--muted)", transition: "color 0.3s",
          background: "none", border: "none", padding: 0, font: "inherit" }}
        onMouseEnter={(e) => (e.target.style.color = "var(--gold)")}
        onMouseLeave={(e) => (e.target.style.color = "var(--muted)")}>
        CERTIFICATES ▸
      </button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.35 }}
            onClick={() => setOpen(false)}
            style={{ position: "fixed", inset: 0, zIndex: 60,
              background: "rgba(12,9,6,0.9)", backdropFilter: "blur(10px)",
              WebkitBackdropFilter: "blur(10px)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: "var(--gutter)" }}>
            <motion.div
              ref={panelRef} tabIndex={-1} role="dialog" aria-modal="true"
              aria-label="Certificates and credentials"
              initial={{ opacity: 0, y: 40, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.98 }}
              transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
              onClick={(e) => e.stopPropagation()}
              style={{ width: "min(560px, 100%)", background: "var(--surface)",
                border: "1px solid var(--hairline)", borderRadius: 2, outline: "none",
                padding: "clamp(1.8rem, 4vw, 2.8rem)" }}>

              {/* header */}
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center",
                marginBottom: "2rem" }}>
                <div style={{ display: "flex", alignItems: "center", gap: "1rem" }}>
                  <div style={{ width: 34, height: 1, background: "linear-gradient(to right, var(--gold), transparent)" }} />
                  <span className="label" style={{ color: "var(--gold)" }}>Credentials</span>
                </div>
                <div style={{ display: "flex", alignItems: "center", gap: "1.2rem" }}>
                  <span className="numeral">{String(CERTS.length).padStart(2, "0")} RECORDS</span>
                  <button data-hover onClick={() => setOpen(false)} className="numeral"
                    aria-label="Close certificates dialog"
                    style={{ cursor: "pointer", color: "var(--muted)", transition: "color 0.3s",
                      padding: "0.3rem", background: "none", border: "none", font: "inherit" }}
                    onMouseEnter={(e) => (e.target.style.color = "var(--gold)")}
                    onMouseLeave={(e) => (e.target.style.color = "var(--muted)")}>
                    ✕ ESC
                  </button>
                </div>
              </div>

              {/* records */}
              {CERTS.map((c, i) => {
                const inner = (
                  <div style={{ display: "flex", alignItems: "baseline", gap: "1.2rem",
                    padding: "1.1rem 0",
                    borderBottom: i < CERTS.length - 1 ? "1px solid var(--hairline)" : "none" }}>
                    <span className="numeral" style={{ color: "var(--gold)", flexShrink: 0 }}>
                      0{i + 1}
                    </span>
                    <div style={{ flex: 1 }}>
                      <p style={{ fontSize: "1rem", fontWeight: 500, color: "var(--cream)",
                        letterSpacing: "-0.01em", marginBottom: "0.25rem" }}>
                        {c.title}
                      </p>
                      <p className="numeral" style={{ letterSpacing: "0.14em" }}>
                        {c.issuer.toUpperCase()}
                      </p>
                    </div>
                    {c.href && (
                      <span className="numeral" style={{ color: "var(--gold)", flexShrink: 0 }}>
                        VIEW ↗
                      </span>
                    )}
                  </div>
                );
                return c.href ? (
                  <a key={c.title} data-hover href={c.href} target="_blank" rel="noopener noreferrer"
                    style={{ display: "block", textDecoration: "none" }}>
                    {inner}
                  </a>
                ) : (
                  <div key={c.title}>{inner}</div>
                );
              })}

              {/* footer aside */}
              <p className="serif-italic" style={{ fontSize: "0.95rem", color: "var(--faint)",
                marginTop: "1.8rem", textAlign: "center" }}>
                Full transcripts available on request.
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
