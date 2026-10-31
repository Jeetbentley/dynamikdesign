// The current Tile Android app; /tile/app/latest points at tile-<version>.apk from this file.
const tileApp = require('./public/tile/app/version.json')

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
      // Tile help: old/short links land on the matching section of /tile/start
      { source: '/tile/manual', destination: '/tile/start#setup', statusCode: 301 },
      { source: '/tile/warranty', destination: '/tile/start#warranty', statusCode: 301 },
      // Temporary, so it can move to each new release
      { source: '/tile/app/latest', destination: `/tile/app/tile-${tileApp.version}.apk`, statusCode: 302 },
    ]
  },
  async headers() {
    // Tile firmware updates. Devices fetch these directly, so: no redirects or rewrites touch /tile/fw/,
    // the manifest is never cached, and each .bin (named by version) is cached forever and served as-is.
    const noCache = [
      { key: 'Cache-Control', value: 'no-cache, no-store, must-revalidate' },
      { key: 'Content-Type', value: 'application/json' },
      { key: 'X-Content-Type-Options', value: 'nosniff' },
    ]
    return [
      { source: '/tile/fw/manifest.json', headers: noCache },
      { source: '/tile/fw/releases.json', headers: noCache },
      {
        source: '/tile/fw/:file([^/]+\\.bin)',
        headers: [
          { key: 'Cache-Control', value: 'public, max-age=31536000, immutable' },
          { key: 'Content-Type', value: 'application/octet-stream' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
      // Tile Android app
      { source: '/tile/app/version.json', headers: noCache },
      {
        source: '/tile/app/:file([^/]+\\.apk)',
        headers: [
          { key: 'Content-Type', value: 'application/vnd.android.package-archive' },
          { key: 'Content-Disposition', value: 'attachment' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
        ],
      },
    ]
  },
}

module.exports = nextConfig
