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
          background: "linear-gradient(135deg, #0f0f1a 0%, #1c1a35 50%, #0f0f1a 100%)",
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
        {/* Top-left accent circle */}
        <div
          style={{
            position: "absolute",
            top: -120,
            left: -120,
            width: 480,
            height: 480,
            borderRadius: "50%",
            background: "rgba(127,119,221,0.22)",
            display: "flex",
          }}
        />
        {/* Bottom-right accent circle */}
        <div
          style={{
            position: "absolute",
            bottom: -100,
            right: -100,
            width: 380,
            height: 380,
            borderRadius: "50%",
            background: "rgba(56,193,114,0.14)",
            display: "flex",
          }}
        />

        {/* Logo row */}
        <div
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 36,
          }}
        >
          <div
            style={{
              width: 60,
              height: 60,
              borderRadius: 14,
              background: "#7F77DD",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginRight: 16,
            }}
          >
            <span
              style={{
                fontSize: 30,
                fontWeight: 700,
                color: "white",
              }}
            >
              S
            </span>
          </div>
          <span
            style={{
              fontSize: 42,
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
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            justifyContent: "center",
            fontSize: 58,
            fontWeight: 700,
            color: "white",
            textAlign: "center",
            lineHeight: 1.1,
            letterSpacing: "-1.5px",
            width: 900,
            marginBottom: 28,
          }}
        >
          AI video scripts for{" "}
          <span style={{ color: "#7F77DD", marginLeft: 14 }}>freelancers</span>
        </div>

        {/* Subline */}
        <div
          style={{
            display: "flex",
            fontSize: 26,
            color: "rgba(255,255,255,0.60)",
            textAlign: "center",
            width: 680,
          }}
        >
          YouTube, TikTok &amp; Reels — in your client's voice, in 60 seconds
        </div>

        {/* Bottom badge */}
        <div
          style={{
            position: "absolute",
            bottom: 44,
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            background: "rgba(127,119,221,0.18)",
            border: "1px solid rgba(127,119,221,0.3)",
            borderRadius: 999,
            paddingTop: 8,
            paddingBottom: 8,
            paddingLeft: 22,
            paddingRight: 22,
          }}
        >
          <span
            style={{
              color: "rgba(255,255,255,0.65)",
              fontSize: 20,
            }}
          >
            scribtly.com
          </span>
        </div>
      </div>
    ),
    { ...size }
  );
}
