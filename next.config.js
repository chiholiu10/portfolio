/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
  },
  env: {
    NODE_ENV: process.env.NODE_ENV,
    NEXT_API_URL: process.env.NEXT_API_URL,
    NEXT_STRAPI_PRODUCTION: process.env.NEXT_STRAPI_PRODUCTION,
    NEXT_PUBLIC_SERVICE_ID: process.env.NEXT_PUBLIC_SERVICE_ID,
    NEXT_PUBLIC_KEY: process.env.NEXT_PUBLIC_KEY
  },
  trailingSlash: true,
};

module.exports = nextConfig;
