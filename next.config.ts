import type { NextConfig } from "next";
import path from "path";

const nextConfig: NextConfig = {
  output: "standalone",
  outputFileTracingRoot: path.join(__dirname),
  async headers() {
    return [
      {
        // Hashed build assets — safe to cache forever
        source: "/_next/static/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=31536000, immutable" }],
      },
      {
        source: "/images/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=86400" }],
      },
      {
        // Deploy freshness marker must never be cached
        source: "/deploy-commit.txt",
        headers: [{ key: "Cache-Control", value: "no-store" }],
      },
      {
        // HTML: short CDN cache so deploys go live within a minute
        // (default s-maxage=31536000 served year-stale pages via hcdn)
        source: "/:path*",
        headers: [{ key: "Cache-Control", value: "public, max-age=0, s-maxage=60, must-revalidate" }],
      },
    ];
  },
  /* config options here */
  typescript: {
    ignoreBuildErrors: true,
  },
  reactStrictMode: false,
};

export default nextConfig;
