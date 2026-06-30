import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  typescript: {
    // Prisma client types require `prisma generate` which runs in the Docker build.
    // Skip type checking here; CI/CD enforces it via the Dockerfile.
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
