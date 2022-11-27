const nextConfig = {
  reactStrictMode: true,
  env: {
    NEXT_SPACE: process.env.NEXT_SPACE,
    NEXT_PORT: process.env.NEXT_PORT,
  },
};

module.exports = nextConfig;
