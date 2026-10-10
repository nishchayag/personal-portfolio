import type { NextConfig } from "next";

// The vibe menu (repo nishchayag/vibe-menu) is a separate Vercel project built with basePath /vibes.
// Set VIBES_ORIGIN to its deployment URL (e.g. https://vibe-menu-xyz.vercel.app) and /vibes is served from it.
// Unset means no rewrite, so links to /vibes 404 rather than break the build.
const VIBES_ORIGIN = process.env.VIBES_ORIGIN?.replace(/\/$/, "");

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "api.microlink.io",
        port: "",
        pathname: "/**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    minimumCacheTTL: 60,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  experimental: {
    optimizePackageImports: ["framer-motion", "lucide-react"],
  },
  compress: true,
  poweredByHeader: false,
  reactStrictMode: true,
  compiler: {
    removeConsole: process.env.NODE_ENV === "production",
  },
  async rewrites() {
    if (!VIBES_ORIGIN) return [];
    return [
      // The menu's analytics (script and events) go to its own project, not the portfolio's.
      { source: "/vibes/_vercel/insights/:path*", destination: `${VIBES_ORIGIN}/_vercel/insights/:path*` },
      { source: "/vibes", destination: `${VIBES_ORIGIN}/vibes` },
      { source: "/vibes/:path+", destination: `${VIBES_ORIGIN}/vibes/:path+` },
    ];
  },
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "X-XSS-Protection",
            value: "1; mode=block",
          },
          {
            key: "Referrer-Policy",
            value: "origin-when-cross-origin",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains; preload",
          },
        ],
      },
      {
        source: "/manifest.json",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=86400",
          },
        ],
      },
      {
        source: "/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
