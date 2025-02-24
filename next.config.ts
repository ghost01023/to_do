import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'assets.codepen.io',
      },
    ],
  },
};

module.exports = {
  env: {
    JWT_PUBLIC_KEY: process.env.JWT_PUBLIC_KEY
  }
}

export default nextConfig;
