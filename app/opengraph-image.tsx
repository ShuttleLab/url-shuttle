import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export const alt = "URL Shuttle — Free Online URL Parser, Editor & Builder Toolkit";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%)",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 160, marginBottom: 24 }}>🔗</div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            color: "#ffffff",
            letterSpacing: "-0.02em",
          }}
        >
          URL Shuttle
        </div>
        <div
          style={{
            fontSize: 40,
            color: "#e0d4ff",
            marginTop: 16,
            maxWidth: 900,
            textAlign: "center",
          }}
        >
          Free Online URL Parser, Editor & Builder Toolkit
        </div>
      </div>
    ),
    { ...size }
  );
}
