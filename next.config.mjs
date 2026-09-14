import { createMDX } from 'fumadocs-mdx/next';

const withMDX = createMDX();

/** @type {import('next').NextConfig} */
const config = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'img.shields.io',
      },
    ],
  },
  async redirects() {
    return [
      {
        source: '/docs/:path*',
        destination: '/blog/:path*',
        permanent: true,
      },
    ];
  },
};

export default withMDX(config);
