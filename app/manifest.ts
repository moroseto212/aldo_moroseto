import type { MetadataRoute } from "next";
import { site } from "@/data/site";

// Wajib untuk `output: "export"`: route metadata harus dipaksa statis.
export const dynamic = "force-static";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.tagline}`,
    short_name: site.name,
    description: site.description,
    id: "/",
    start_url: "/",
    scope: "/",
    display: "standalone",
    orientation: "portrait",
    background_color: "#08080a",
    theme_color: "#08080a",
    lang: "id",
    categories: ["business", "portfolio", "developer"],
    icons: [
      { src: "/icon-192-v7.png", sizes: "192x192", type: "image/png" },
      { src: "/icon-512-v7.png", sizes: "512x512", type: "image/png" },
      {
        src: "/icon-maskable-512-v7.png",
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
    ],
  };
}
