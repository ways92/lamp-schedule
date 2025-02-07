// next.config.ts
import path from 'path';
import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  eslint: {
    // Peringatan: Ini akan mengabaikan error ESLint selama build, gunakan dengan hati-hati!
    ignoreDuringBuilds: true,
  },
  webpack: (config) => {
    // Menambahkan alias '@' agar menunjuk ke folder 'src'
    config.resolve.alias['@'] = path.resolve(__dirname, 'src');
    return config;
  },
};

export default nextConfig;
