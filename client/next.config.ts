// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["re-s3-project.s3.amazonaws.com"],
    remotePatterns: [
      {
        protocol: "https",
        hostname: "re-s3-project.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      }
    ],
  },
};

export default nextConfig;
