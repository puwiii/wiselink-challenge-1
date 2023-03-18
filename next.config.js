/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats:['image/avif', 'image/webp'],
    domains: ['assets.coingecko.com']
  }
}

module.exports = nextConfig
