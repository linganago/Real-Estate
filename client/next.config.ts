import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "pm-s3-images.s3.amazonaws.com",
        pathname: "/**",
      },
    ],
  },
};

export default nextConfig;
