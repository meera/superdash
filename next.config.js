/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  swcMinify: true,
  images: {
    domains: ['i.pravatar.cc', '*.supabase.co', "mgcqzjogxbkdfqvivknd.supabase.co"],
  },
}

module.exports = nextConfig
