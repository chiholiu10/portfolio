const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
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
    qualities: [60, 65, 70, 75, 90],
    deviceSizes: [320, 350, 384, 640, 750, 828, 1080, 1200, 1920],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 332],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "res.cloudinary.com",
      },
      {
        protocol: "https",
        hostname: "images.ctfassets.net",
      },
    ],
  },
  async redirects() {
    return [{
      source: "/project/tours-tickets-dashboard",
      destination: "/project/moments-dashboard",
      permanent: true,
    }, {
      source: "/project/portfolio-showcase",
      destination: "/project/vodafoneziggo",
      permanent: true,
    }];
  },
  async headers() {
    const developmentScripts =
      process.env.NODE_ENV === "development" ? " 'unsafe-eval'" : "";
    const contentSecurityPolicy = [
      "default-src 'self'",
      `script-src 'self' 'unsafe-inline'${developmentScripts}`,
      "style-src 'self' 'unsafe-inline'",
      "img-src 'self' data: blob: https://res.cloudinary.com https://images.ctfassets.net",
      "font-src 'self' data:",
      "connect-src 'self'",
      "frame-ancestors 'none'",
      "base-uri 'self'",
      "form-action 'self'",
      "object-src 'none'",
    ].join("; ");

    return [
      {
        source: "/:path*",
        headers: [
          { key: "Content-Security-Policy", value: contentSecurityPolicy },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=(), payment=()",
          },
          {
            key: "Strict-Transport-Security",
            value: "max-age=31536000; includeSubDomains",
          },
        ],
      },
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
