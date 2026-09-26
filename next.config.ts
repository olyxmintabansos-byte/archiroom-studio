import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",
  basePath: "/archiroom-studio",
  trailingSlash: true,
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
