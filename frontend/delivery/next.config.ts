import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.cdndsgni.com',
      },
    ],
  },
};

export default nextConfig;
