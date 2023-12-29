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
        protocol: "http",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      }
    ]
  }
}

module.exports = nextConfig;
