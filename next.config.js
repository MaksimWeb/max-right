/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: 'bloknot.ru', port: '' },
      { protocol: 'https', hostname: 'getwallpapers.com', port: '' },
    ],
  },
};

module.exports = nextConfig;
