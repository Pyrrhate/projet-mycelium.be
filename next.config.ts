import type { NextConfig } from "next";
import path from "node:path";
import { fileURLToPath } from "node:url";

/** Forcer la racine du projet (évite les erreurs quand un package-lock parent existe, ex. Laragon). */
const localDir = path.dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  outputFileTracingRoot: localDir,
  turbopack: {
    root: localDir,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "images.unsplash.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
