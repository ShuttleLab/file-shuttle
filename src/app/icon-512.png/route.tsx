import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const runtime = "edge";

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
          background: "#e11d48",
          fontSize: 288,
        }}
      >
        📁
      </div>
    ),
    { width: 512, height: 512 }
  );
}
