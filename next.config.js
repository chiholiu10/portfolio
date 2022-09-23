/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
  },
  env: {
    NEXT_API_URL: process.env.NEXT_API_URL,
    NEXT_STRAPI_PRODUCTION: process.env.NEXT_STRAPI_PRODUCTION
  }
};

module.exports = nextConfig;
