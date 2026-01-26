import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
  },
  async headers() {
    return [
      {
        source: "/.well-known/apple-app-site-association",
        headers: [
          {
            key: "Content-Type",
            value: "application/json",
          },
        ],
      },
    ];
  },
  images: {
    remotePatterns: [
      {
        hostname: "placehold.co",
      },
      {
        hostname: "ibxifmqovisdyrzpemyv.supabase.co",
      },
    ],
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
