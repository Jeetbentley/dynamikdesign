/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        // Vercel Blob Storage (logo) — matches any subdomain like abc123.public.blob.vercel-storage.com
        protocol: 'https',
        hostname: '**.public.blob.vercel-storage.com',
      },
    ],
  },
  async redirects() {
    // statusCode 301 (Next's `permanent: true` would send 308)
    return [
      { source: '/services/fdm-printing', destination: '/services/build#additive', statusCode: 301 },
      { source: '/services/sla-printing', destination: '/services/build#additive', statusCode: 301 },
      { source: '/services/product-design', destination: '/services/design#industrial-design', statusCode: 301 },
      { source: '/process', destination: '/approach', statusCode: 301 },
      { source: '/materials', destination: '/services/build', statusCode: 301 },
    ]
  },
}

module.exports = nextConfig
