export default function NotFound() {
  return (
    <main style={{
      minHeight: "100vh", display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center", textAlign: "center",
      padding: "0 var(--gutter)", background: "var(--canvas)", position: "relative",
      overflow: "hidden",
    }}>
      <span aria-hidden className="watermark" style={{
        left: "50%", top: "50%", transform: "translate(-50%, -50%)",
        fontSize: "clamp(16rem, 50vw, 40rem)",
      }}>
        ४
      </span>

      <p className="numeral" style={{ color: "var(--gold)", letterSpacing: "0.3em", marginBottom: "1.6rem" }}>
        ( 404 · ٤٠٤ )
      </p>
      <h1 style={{
        fontFamily: "var(--serif)", fontStyle: "italic", fontWeight: 380,
        fontSize: "clamp(2.6rem, 7vw, 6rem)", lineHeight: 1, letterSpacing: "-0.02em",
        color: "var(--cream)", marginBottom: "1.4rem",
      }}>
        Lost the thread<span style={{ color: "var(--gold)" }}>.</span>
      </h1>
      <p style={{ fontSize: "0.95rem", color: "var(--muted)", maxWidth: 420, lineHeight: 1.8,
        fontWeight: 300, marginBottom: "2.6rem" }}>
        This page scattered back into the constellation. The rest of the manuscript is still here.
      </p>
      <a href="/" className="btn">
        Return Home <span style={{ color: "var(--gold)" }}>→</span>
      </a>
    </main>
  );
}
