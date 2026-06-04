import type { MetadataRoute } from "next";

export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "URL Shuttle — Free Online URL Parser, Editor & Builder Toolkit",
    short_name: "URL Shuttle",
    description:
      "Parse, edit, build, and validate URLs in your browser. 100% private, no uploads.",
    start_url: "/",
    display: "standalone",
    background_color: "#f5f3ff",
    theme_color: "#7c3aed",
    orientation: "any",
    icons: [
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
      { src: "/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
      { src: "/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
    ],
  };
}
