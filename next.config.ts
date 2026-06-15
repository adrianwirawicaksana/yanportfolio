import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  productionBrowserSourceMaps: false,
  compress: true,
  reactStrictMode: true,

  images: {
    remotePatterns: [
      { protocol: "https", hostname: "cdn.pixabay.com" },
      { protocol: "https", hostname: "images.pokemontcg.io" },
      { protocol: "https", hostname: "i.ytimg.com" },
      { protocol: "https", hostname: "logos.hunter.io" },
      { protocol: "https", hostname: "*.midtrans.com" },
    ],
    qualities: [75, 85],
    minimumCacheTTL: 31536000,
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
    formats: ["image/avif", "image/webp"],
  },

  experimental: {
    optimizePackageImports: ["react-icons"],
  },

  headers: async () => {
    const cspHeader =
      "default-src 'self'; " +
      "script-src 'self' 'unsafe-inline' 'unsafe-eval' blob: data: midtrans.com *.midtrans.com https://app.sandbox.midtrans.com https://snap-assets.sandbox.midtrans.com https://*.youtube.com https://*.youtube-nocookie.com; " +
      "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com midtrans.com *.midtrans.com snap-assets.sandbox.midtrans.com snap-assets.midtrans.com; " +
      "font-src 'self' data: https://fonts.gstatic.com https://fonts.cdnfonts.com; " +
      "img-src 'self' blob: data: midtrans.com *.midtrans.com https://*.ytimg.com https://logos.hunter.io https://images.pokemontcg.io https://cdn.pixabay.com; " +
      "connect-src 'self' blob: data: midtrans.com *.midtrans.com https://app.sandbox.midtrans.com; " +
      "frame-src 'self' midtrans.com *.midtrans.com https://app.sandbox.midtrans.com https://www.youtube.com https://www.youtube-nocookie.com; " +
      "worker-src 'self' blob: midtrans.com *.midtrans.com https://*.youtube.com;";

    return [
      {
        source: "/:path*",
        headers: [
          {
            key: "Content-Security-Policy",
            value: cspHeader,
          },
          {
            key: "X-Content-Type-Options",
            value: "nosniff",
          },
          {
            key: "X-Frame-Options",
            value: "DENY",
          },
          {
            key: "Referrer-Policy",
            value: "strict-origin-when-cross-origin",
          },
        ],
      },
      {
        source: "/:path*.(png|jpg|jpeg|gif|webp|svg|ico|avif)",
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
