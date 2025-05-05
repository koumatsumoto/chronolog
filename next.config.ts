import type { NextConfig } from "next";

/**
 * GitHub Pages 用の設定を参考に standalone build 対応
 */
const nextConfig: NextConfig = {
  output: "export",
  basePath: process.env.NODE_ENV === "production" ? "/chronolog" : "",
};

export default nextConfig;
