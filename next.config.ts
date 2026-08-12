import type { NextConfig } from "next";

const nextConfig: NextConfig = {
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
