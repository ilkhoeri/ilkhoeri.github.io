import { withContentlayer } from "next-contentlayer2";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export", // must be exported function "generateStaticParams()", which is required with "output: export" config
  reactStrictMode: true,
  experimental: {
    // appDir: true,
  }
};

export default withContentlayer(nextConfig);
