import type { NextConfig } from "next";
import createMDX from "@next/mdx";
import bundleAnalyzer from "@next/bundle-analyzer";

const withBundleAnalyzer = bundleAnalyzer({
  enabled: process.env.ANALYZE === "true",
});

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "**",
      },
    ],
    formats: ["image/avif", "image/webp"],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
    imageSizes: [16, 32, 48, 64, 96, 128, 256, 384],
  },
  // Build optimizations
  reactStrictMode: true,
  // Optimize production builds
  productionBrowserSourceMaps: false,
  // Optimize package imports
  modularizeImports: {
    "react-markdown": {
      transform: "react-markdown/dist/{{member}}",
    },
  },
};

const withMDX = createMDX({
  options: {
    remarkPlugins: [],
    rehypePlugins: [],
  },
  extension: /\.mdx?$/,
});

export default withBundleAnalyzer(withMDX(nextConfig));
