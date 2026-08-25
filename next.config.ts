import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // Local placeholder project thumbnails are SVGs; safe to allow since
    // they're static files we control, not remote/user-uploaded content.
    dangerouslyAllowSVG: true,
  },
};

export default nextConfig;
