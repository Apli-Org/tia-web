import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  experimental: {
    serverActions: {
      bodySizeLimit: "50mb",
    },
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
