const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_SPACE: process.env.NEXT_SPACE,
  },
  turbopack: {
    root: __dirname,
  },
  compiler: {
    styledComponents: true,
  },
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
  },
  async headers() {
    return [
      {
        source: "/:all*(svg|jpg|jpeg|png|webp|avif|ico)",
        headers: [
          { key: "Cache-Control", value: "public, max-age=31536000, immutable" },
        ],
      },
    ];
  },
};

module.exports = nextConfig;
