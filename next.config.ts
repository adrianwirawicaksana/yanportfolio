import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    // Allow explicit quality 85 in components (default 75 remains)
    qualities: [75, 85],
    minimumCacheTTL: 60 * 60 * 24 * 365,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
  },
  experimental: {
    optimizePackageImports: ["react-icons"],
  },

  headers: async () => {
    // Dibuat satu baris lurus tanpa spasi/baris baru tersembunyi agar dibaca 100% akurat oleh browser
    const cspHeader =
      "default-src 'self'; script-src 'self' 'unsafe-inline' 'unsafe-eval' https://app.sandbox.midtrans.com; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://snap-assets.sandbox.midtrans.com; font-src 'self' data: https://fonts.gstatic.com https://fonts.cdnfonts.com; img-src 'self' blob: data: https://*.midtrans.com https://*.ytimg.com; connect-src 'self' https://app.sandbox.midtrans.com; frame-src 'self' https://app.sandbox.midtrans.com https://www.youtube.com https://www.youtube-nocookie.com;";

    return [
      {
        source: "/(.*)",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader,
          },
        ],
      },
      {
        source: "/(.*).(png|jpg|jpeg|gif|webp|svg)",
        headers: [
          {
            key: "Cache-Control",
            value: "public, max-age=31536000, immutable",
          },
        ],
      },
    ];
  },
};

export default nextConfig;
