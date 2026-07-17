import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Marcos Rigo — Desarrollador Full Stack";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

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
          alignItems: "flex-start",
          padding: "80px",
          background: "#FFFFFF",
          backgroundImage:
            "radial-gradient(circle at 85% 15%, rgba(245,200,76,0.18), transparent 50%), radial-gradient(circle at 10% 90%, rgba(216,31,42,0.08), transparent 55%)",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: 16,
            marginBottom: 32,
          }}
        >
          <div
            style={{
              width: 56,
              height: 56,
              borderRadius: 9999,
              background: "#D81F2A",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              color: "#ffffff",
              fontSize: 28,
              fontWeight: 800,
            }}
          >
            R
          </div>
          <span style={{ color: "#4A6485", fontSize: 24, fontWeight: 600, letterSpacing: 2 }}>
            RIGO.MARCOS
          </span>
        </div>
        <div style={{ display: "flex", fontSize: 88, fontWeight: 800, color: "#16355C" }}>
          Marcos Rigo
        </div>
        <div
          style={{
            display: "flex",
            fontSize: 32,
            fontWeight: 700,
            color: "#ffffff",
            background: "#D81F2A",
            padding: "10px 28px",
            borderRadius: 9999,
            marginTop: 24,
          }}
        >
          Desarrollador Full Stack
        </div>
        <div style={{ display: "flex", fontSize: 28, color: "#4A6485", marginTop: 32 }}>
          React · Next.js · Node.js
        </div>
      </div>
    ),
    { ...size }
  );
}
