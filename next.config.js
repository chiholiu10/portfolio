/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["localhost"],
  },
  experimental: {
    forceSwcTransforms: true,
  },
  env: {
    NEXT_NODE_ENV: process.env.NEXT_NODE_ENV,
    NEXT_API_URL: process.env.NEXT_API_URL,
    NEXT_STRAPI_PRODUCTION: process.env.NEXT_STRAPI_PRODUCTION,
    NEXT_PUBLIC_SERVICE_ID: process.env.NEXT_PUBLIC_SERVICE_ID,
    NEXT_PUBLIC_KEY: process.env.NEXT_PUBLIC_KEY
  },
  trailingSlash: true,
};

module.exports = nextConfig;
