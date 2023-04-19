/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    // next.js documentation to explain un-configured host with next/image: https://nextjs.org/docs/messages/next-image-unconfigured-host
    remotePatterns: [
      {
        protocol: "http",
        hostname: "books.google.com",
      },
    ],
  },
};

module.exports = nextConfig;
