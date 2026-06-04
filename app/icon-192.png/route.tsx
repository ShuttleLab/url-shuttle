import { ImageResponse } from "next/og";

export const dynamic = "force-static";

export async function GET() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
          borderRadius: "20%",
        }}
      >
        <div style={{ fontSize: 120 }}>🔗</div>
      </div>
    ),
    { width: 192, height: 192 }
  );
}
