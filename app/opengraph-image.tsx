import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Scribtly — AI video scripts for freelancers";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OgImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0f0f1a 0%, #1a1830 50%, #0f0f1a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "sans-serif",
          position: "relative",
        }}
      >
        {/* purple glow top-left */}
        <div
          style={{
            position: "absolute",
            top: -100,
            left: -100,
            width: 500,
            height: 500,
            borderRadius: "50%",
            background: "rgba(127,119,221,0.25)",
            filter: "blur(80px)",
          }}
        />
        {/* green glow bottom-right */}
        <div
          style={{
            position: "absolute",
            bottom: -80,
            right: -80,
            width: 400,
            height: 400,
            borderRadius: "50%",
            background: "rgba(56,193,114,0.15)",
            filter: "blur(70px)",
          }}
        />

        {/* Logo area */}
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
              borderRadius: 14,
              background: "#7F77DD",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 28,
              color: "white",
              fontWeight: 700,
            }}
          >
            S
          </div>
          <span
            style={{
              fontSize: 40,
              fontWeight: 700,
              color: "white",
              letterSpacing: "-1px",
            }}
          >
            Scribtly
          </span>
        </div>

        {/* Headline */}
        <div
          style={{
            fontSize: 56,
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            lineHeight: 1.1,
            letterSpacing: "-1.5px",
            maxWidth: 900,
            marginBottom: 24,
          }}
        >
          AI video scripts for{" "}
          <span style={{ color: "#7F77DD" }}>freelancers</span>
        </div>

        {/* Subline */}
        <div
          style={{
            fontSize: 26,
            color: "rgba(255,255,255,0.65)",
            textAlign: "center",
            maxWidth: 700,
          }}
        >
          YouTube, TikTok &amp; Reels — in your client's voice, in 60 seconds
        </div>

        {/* Bottom badge */}
        <div
          style={{
            position: "absolute",
            bottom: 40,
            display: "flex",
            alignItems: "center",
            gap: 8,
            background: "rgba(127,119,221,0.18)",
            border: "1px solid rgba(127,119,221,0.3)",
            borderRadius: 999,
            padding: "8px 20px",
            color: "rgba(255,255,255,0.7)",
            fontSize: 18,
          }}
        >
          scribtly.com
        </div>
      </div>
    ),
    { ...size }
  );
}
