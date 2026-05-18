import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "文件穿梭机 | File Shuttle",
    short_name: "File Shuttle",
    description: "Fast, secure, self-destruct file transfer",
    start_url: "/",
    display: "standalone",
    background_color: "#fff1f2",
    theme_color: "#e11d48",
    orientation: "any",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png" },
    ],
  };
}
