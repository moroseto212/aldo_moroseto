import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  experimental: {
    // Keep security-upgrade nudges for coding agents enabled.
    agentUpgrade: "security",
  },
  cacheComponents: true,
  partialPrefetching: true,
  images: {
    // Next 16 defaults `qualities` to [75] only; register the values we need
    // so high-detail screenshots aren't coerced down to 75.
    qualities: [75, 90, 95, 100],
    // Every source in /public tops out at 1920px wide. Next's default
    // deviceSizes includes 2048 and 3840, which would *upscale* screenshots
    // (blurry). Cap the list at 1920 so the browser never picks a size
    // larger than the real image.
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
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
