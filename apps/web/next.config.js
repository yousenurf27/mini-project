/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
      },
      {
        protocol: 'https',
        hostname: 'cdn.evbstatic.com',
        port: '',
      },
    ],
  },
  reactStrictMode: false,
}

module.exports = nextConfig
