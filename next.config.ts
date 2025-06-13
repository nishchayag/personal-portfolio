import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    domains: ["api.microlink.io"],
  },
};

export default nextConfig;
const withVideos = require("next-videos");

module.exports = withVideos();
