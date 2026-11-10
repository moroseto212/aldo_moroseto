import type { NextConfig } from "next";

// Project page GitHub Pages disajikan dari sub-folder (mis. /aldo_moroseto).
// Nilai ini diisi otomatis oleh
// actions/configure-pages saat deploy dan kosong saat dijalankan lokal.
// Dipakai juga oleh loader gambar serta manifest, jadi harus berawalan
// NEXT_PUBLIC_ agar ikut ter-inline ke bundle klien.
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? "";

const nextConfig: NextConfig = {
  /* config options here */
  // GitHub Pages hanya menyajikan berkas statis, jadi aplikasi di-export penuh.
  output: "export",
  basePath,
  // /blog/ -> /blog/index.html, format yang disajikan GitHub Pages.
  trailingSlash: true,
  experimental: {
    // Keep security-upgrade nudges for coding agents enabled.
    agentUpgrade: "security",
  },
  images: {
    // Optimasi gambar bawaan butuh server; loader kustom hanya menambahkan
    // basePath lalu menyajikan berkas asli dari /public.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
  },
  turbopack: {
    rules: {
      "*.css": {
        loaders: ["@tailwindcss/turbopack"],
        as: "*.css",
      },
    },
  },
};

export default nextConfig;
