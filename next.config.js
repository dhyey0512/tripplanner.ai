/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "energetic-ferret-448.convex.cloud",
        port: "",
      },
      {
        protocol: "https",
        hostname: "energetic-ferret-448.convex.cloud",
        port: "",
      },
      {
        protocol: "https",
        hostname: "openweathermap.org",
        port: "",
        pathname:"**"
      },
    ],
  },
};

module.exports = nextConfig;
