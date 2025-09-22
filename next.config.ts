import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Use Netlify's image optimization instead of Next.js built-in
    // This avoids bundling sharp and reduces function size significantly
    loader: 'custom',
    loaderFile: './lib/netlify-image-loader.ts',
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