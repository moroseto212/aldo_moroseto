import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  // Vercel hanya menyajikan berkas statis, jadi aplikasi di-export penuh.
  output: "export",
  // /blog/ -> /blog/index.html, format yang disajikan hosting statis.
  trailingSlash: true,
  experimental: {
    // Keep security-upgrade nudges for coding agents enabled.
    agentUpgrade: "security",
  },
  images: {
    // Optimasi gambar bawaan butuh server; loader kustom menyajikan berkas
    // asli dari /public.
    loader: "custom",
    loaderFile: "./lib/image-loader.ts",
    // Kartu proyek meminta quality 95; daftarkan supaya tidak diperingatkan.
    qualities: [75, 95],
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
