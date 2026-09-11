/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['avatars.githubusercontent.com', 'ui-avatars.com'],
  },
  async redirects() {
    return [
      {
        source: '/khoa-1-ban-tu-lap',
        destination: '/24-ai-agent',
        permanent: true,
      },
      {
        source: '/khoa-2-ban-co-doi-truong',
        destination: '/coaching',
        permanent: true,
      },
    ]
  },
  async rewrites() {
    return [
      {
        source: '/Airbnb',
        destination: 'https://airbnb-coaching.vercel.app',
      },
      {
        source: '/Airbnb/:path*',
        destination: 'https://airbnb-coaching.vercel.app/:path*',
      },
    ]
  },
}

export default nextConfig
