import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Don't auto-generate AGENTS.md / CLAUDE.md on dev/build.
  agentRules: false,

  experimental: {
    serverActions: {
      bodySizeLimit: "10mb",
    },
  },
  
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.google.com",
        pathname: "/drive/static/images/drive/*",
      },
    ],
  },

  async redirects() {
    return [];
  },
};

export default nextConfig;
