import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  transpilePackages: ["@shortking/shared"],
  async rewrites() {
    return [
      {
        source: "/api/v1/:path*",
        destination: "http://127.0.0.1:5001/api/v1/:path*",
      },
    ];
  },
};

export default nextConfig;
