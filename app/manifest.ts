import type { MetadataRoute } from "next";
import { site } from "@/data/site";

// Wajib untuk `output: "export"`: route metadata harus dipaksa statis.
export const dynamic = "force-static";

// basePath tidak otomatis diterapkan pada isi manifest, jadi prefix dibuat manual.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: `${site.name} — ${site.tagline}`,
    short_name: site.name,
    description: site.description,
    id: `${basePath}/`,
    start_url: `${basePath}/`,
    scope: `${basePath}/`,
    display: "standalone",
    orientation: "portrait",
    background_color: "#08080a",
    theme_color: "#08080a",
    lang: "id",
    categories: ["business", "portfolio", "developer"],
    icons: [
      { src: `${basePath}/icon-192.png`, sizes: "192x192", type: "image/png" },
      { src: `${basePath}/icon-512.png`, sizes: "512x512", type: "image/png" },
      {
        src: `${basePath}/icon-512.png`,
        sizes: "512x512",
        type: "image/png",
        purpose: "maskable",
      },
      { src: `${basePath}/apple-icon.png`, sizes: "180x180", type: "image/png" },
    ],
  };
}
