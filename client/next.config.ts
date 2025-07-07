// next.config.js
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "re-s3-project.s3.amazonaws.com",
        port: "",
        pathname: "/**",
      },
      { // <--- ADD THIS SECTION
        protocol: "https",
        hostname: "example.com", // Add example.com
        port: "",
        pathname: "/**", // Allows any path on example.com
      },
    ],
  },
};

export default nextConfig;