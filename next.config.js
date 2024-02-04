const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_SPACE: process.env.NEXT_SPACE,
  },
  swcMinify: true,
  compiler: {
    styledComponents: true,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ]
  }
}

module.exports = nextConfig;
