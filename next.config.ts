import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Use Netlify's image optimization instead of Next.js built-in
    // This avoids bundling sharp and reduces function size significantly
    loader: 'custom',
    loaderFile: './lib/netlify-image-loader.ts',
    formats: ['image/avif', 'image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    minimumCacheTTL: 60,
    remotePatterns: [],
  },
  experimental: {
    serverActions: {
      bodySizeLimit: '2mb',
    },
  },
  // Optimize for production
  compress: true,
}

export default nextConfig;