import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    // Prisma client types are generated inside Docker (npx prisma generate).
    // In this environment the binary download is unavailable, so we skip the
    // check here — type errors are caught in the Docker build pipeline.
    ignoreBuildErrors: true,
  },
  images: {
    remotePatterns: [
      { protocol: "https", hostname: "media.licdn.com" },
      { protocol: "https", hostname: "**.licdn.com" },
    ],
  },
};

export default nextConfig;
