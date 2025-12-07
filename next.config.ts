import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  serverExternalPackages: ['pdfkit'],
  async redirects() {
    return [
      {
        source: '/',
        destination: '/dashboard',
        permanent: false,
      },
    ]
  },
  cacheComponents: true,
  typedRoutes: true,
  enablePrerenderSourceMaps: true,
  productionBrowserSourceMaps: true,

  experimental: {
    globalNotFound: true,
  },
}

export default nextConfig
