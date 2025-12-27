import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  eslint: {
    // Disable ESLint during builds for faster deployment
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Disable TypeScript errors during builds for faster deployment
    ignoreBuildErrors: true,
  },
  devIndicators: {
    // Position of development indicators
    position: 'bottom-left',
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'ideogram.ai',
        port: '',
        pathname: '/api/images/**',
      },
      {
        protocol: 'https',
        hostname: '127.0.0.1',
        port: '',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/media/**',
      },
      {
        protocol: 'https',
        hostname: 'picsum.photos',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'v3b.fal.media',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'fal.media',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'scontent-*.cdninstagram.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: '*.cdninstagram.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'instagram.com',
        port: '',
        pathname: '/**',
      },
    ],
    unoptimized: true,
  },
};

export default nextConfig;