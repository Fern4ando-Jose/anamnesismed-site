/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    serverActions: { allowedOrigins: ['anamnesismed.com'] },
  },
}

module.exports = nextConfig
