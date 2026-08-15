import type { NextConfig } from "next";

const isProd = process.env.NODE_ENV === "production";
const repoName = "prosmack-sites";
const basePath = process.env.NEXT_PUBLIC_BASE_PATH ?? (isProd ? `/${repoName}` : "");

const nextConfig: NextConfig = {
  devIndicators: false,
  output: "export",
  basePath: basePath || undefined,
  assetPrefix: basePath ? `${basePath}/` : undefined,
  images: {
    unoptimized: true,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;

