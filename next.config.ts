import type { NextConfig } from "next";
const nextConfig: NextConfig = {
  images: { remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com" }] },
  async redirects() {
    return [
      { source: "/discover", destination: "/about", permanent: true },
      { source: "/enquire", destination: "/inquire", permanent: true },
      { source: "/transportation", destination: "/services/transport", permanent: true },
      { source: "/guides", destination: "/services/guides", permanent: true },
      { source: "/travel-info", destination: "/travel-information", permanent: true },
    ];
  },
};
export default nextConfig;
