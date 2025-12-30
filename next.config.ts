import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
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
