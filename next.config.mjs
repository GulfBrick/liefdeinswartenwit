import path from 'node:path';
import { fileURLToPath } from 'node:url';

import { imageHosts } from './image-hosts.config.mjs';

const repoRoot = path.dirname(fileURLToPath(import.meta.url));

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  productionBrowserSourceMaps: false,
  distDir: process.env.DIST_DIR || '.next',
  output: 'standalone',
  outputFileTracingRoot: repoRoot,

  images: {
    remotePatterns: imageHosts,
  },

  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'DENY',
          },
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'Permissions-Policy',
            value: 'camera=(), microphone=(), geolocation=()',
          },
          {
            key: 'X-Robots-Tag',
            value: 'noindex, nofollow',
          },
        ],
      },
    ];
  },

  async redirects() {
    return [
      {
        source: '/',
        destination: '/wedding',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
