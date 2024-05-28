/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    deviceSizes: [640, 750, 828, 1080, 1200, 1440, 1600, 1920, 2048, 3840],
  },
  webpack(config) {
    config.resolve.fallback = {
      ...config.resolve.fallback,
      fs: false, // the solution
    };

    return config;
  },
};

module.exports = nextConfig;
