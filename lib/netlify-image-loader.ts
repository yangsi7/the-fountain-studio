/**
 * Netlify Image Loader
 * Uses Netlify's built-in image CDN for optimization
 * This eliminates the need for sharp in the function bundle
 */

interface ImageLoaderProps {
  src: string
  width: number
  quality?: number
}

export default function netlifyImageLoader({
  src,
  width,
  quality = 75,
}: ImageLoaderProps): string {
  // For local images, return the URL with Netlify's image CDN parameters
  // Netlify automatically optimizes images served from the same domain
  if (src.startsWith('/')) {
    // Use Netlify's image transformation parameters
    const params = new URLSearchParams({
      w: width.toString(),
      q: quality.toString(),
      fm: 'webp', // Use WebP format for better compression
    })

    // Netlify's CDN will handle the optimization
    return `${src}?${params.toString()}`
  }

  // For external images, return as-is (or you can proxy through your domain)
  return src
}