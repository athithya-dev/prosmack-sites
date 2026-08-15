import type { NextConfig } from "next";

const isGithubActions = process.env.GITHUB_ACTIONS === "true";
const isVercel = process.env.VERCEL === "1" || Boolean(process.env.VERCEL);

// On GitHub Pages (https://<user>.github.io/prosmack-sites/), basePath is required.
// On Vercel (https://<app>.vercel.app) or local development, root "/" is used.
const repoName = "prosmack-sites";
const basePath =
  process.env.NEXT_PUBLIC_BASE_PATH ??
  (isGithubActions && !isVercel ? `/${repoName}` : "");

const nextConfig: NextConfig = {
  devIndicators: false,
  ...(isGithubActions && !isVercel ? { output: "export", trailingSlash: true } : {}),
  basePath: basePath || undefined,
  images: {
    unoptimized: isGithubActions && !isVercel,
  },
  env: {
    NEXT_PUBLIC_BASE_PATH: basePath,
  },
};

export default nextConfig;


