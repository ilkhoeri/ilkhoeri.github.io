import { withContentlayer } from "next-contentlayer2";
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    // appDir: true,
  }
};

export default withContentlayer(nextConfig);
