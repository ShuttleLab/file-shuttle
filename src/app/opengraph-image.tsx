import { ImageResponse } from "next/og";

export const alt = "File Shuttle - Fast, secure, self-destruct file transfer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const dynamic = "force-static";

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
          background:
            "linear-gradient(135deg, #fff1f2 0%, #fda4af 50%, #e11d48 100%)",
          fontFamily: "ui-sans-serif, system-ui, sans-serif",
        }}
      >
        <div style={{ fontSize: 160, marginBottom: 24 }}>📁</div>
        <div
          style={{
            fontSize: 88,
            fontWeight: 800,
            color: "#881337",
            letterSpacing: "-0.02em",
            marginBottom: 16,
          }}
        >
          File Shuttle
        </div>
        <div
          style={{
            fontSize: 40,
            color: "#9f1239",
            maxWidth: 900,
            textAlign: "center",
            lineHeight: 1.3,
          }}
        >
          Fast · Secure · Self-destruct file transfer
        </div>
        <div
          style={{
            position: "absolute",
            bottom: 40,
            fontSize: 28,
            color: "#9f1239",
            opacity: 0.7,
          }}
        >
          file.shuttlelab.org
        </div>
      </div>
    ),
    { ...size }
  );
}
