import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Warning: Ini akan mengabaikan error ESLint selama build, gunakan dengan hati-hati!
    ignoreDuringBuilds: true,
  },
};

export default nextConfig;
