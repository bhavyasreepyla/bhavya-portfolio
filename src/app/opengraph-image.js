import { ImageResponse } from "next/og";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "Bhavya Sree Pyla — AI Engineer";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "90px",
          background: "#0C0906",
          position: "relative",
        }}
      >
        {/* candlelight */}
        <div
          style={{
            position: "absolute",
            top: "-200px",
            right: "-100px",
            width: "700px",
            height: "700px",
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(201,168,124,0.14), rgba(201,168,124,0))",
            display: "flex",
          }}
        />
        <div style={{ display: "flex", alignItems: "center", gap: "18px", marginBottom: "36px" }}>
          <div
            style={{
              width: "60px",
              height: "2px",
              background: "#C9A87C",
              display: "flex",
            }}
          />
          <div
            style={{
              fontSize: "22px",
              letterSpacing: "8px",
              color: "#C9A87C",
              display: "flex",
            }}
          >
            AI ENGINEER · BUILDER · DANCER
          </div>
        </div>
        <div
          style={{
            fontSize: "118px",
            fontWeight: 800,
            color: "#F2EDE3",
            lineHeight: 1,
            letterSpacing: "-4px",
            display: "flex",
          }}
        >
          Bhavya Sree Pyla
          <span style={{ color: "#C9A87C" }}>.</span>
        </div>
        <div
          style={{
            fontSize: "30px",
            color: "#8F857A",
            marginTop: "34px",
            display: "flex",
          }}
        >
          AI systems where logic meets intuition
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "60px",
            left: "90px",
            fontSize: "20px",
            letterSpacing: "4px",
            color: "#57504A",
            display: "flex",
          }}
        >
          MS ARTIFICIAL INTELLIGENCE · NORTHEASTERN UNIVERSITY
        </div>
        <div
          style={{
            position: "absolute",
            bottom: "48px",
            right: "90px",
            fontSize: "44px",
            fontWeight: 700,
            color: "#F2EDE3",
            display: "flex",
          }}
        >
          BSP<span style={{ color: "#C9A87C" }}>.</span>
        </div>
      </div>
    ),
    size
  );
}
