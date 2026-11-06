/** @type {import('next').NextConfig} */
const nextConfig = {
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    // resize + AVIF/WebP for local files and Supabase storage (see lib/img.ts)
    formats: ['image/avif', 'image/webp'],
    remotePatterns: [{ protocol: 'https', hostname: 'dyumqsvgccujcwiepzsh.supabase.co', pathname: '/storage/v1/object/public/**' }],
    deviceSizes: [390, 640, 828, 1080, 1280, 1600, 1920],
    imageSizes: [96, 160, 256, 320, 480],
    minimumCacheTTL: 60 * 60 * 24 * 7,
  },
  compress: true,
  poweredByHeader: false,
  async headers() {
    return [
      {
        // public images/icons: cache for a day, then refresh in the background
        source: '/:path*.(jpg|jpeg|png|webp|svg|ico)',
        headers: [{ key: 'Cache-Control', value: 'public, max-age=86400, stale-while-revalidate=604800' }],
      },
    ]
  },
}

export default nextConfig
