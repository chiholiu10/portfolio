const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_SPACE: process.env.NEXT_SPACE,
  },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
        port: "",
      },
    ],
  },
};

module.exports = nextConfig;
