import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    'domains':[
      '127.0.0.1','localhost'
    ],
    remotePatterns: [
      {
        protocol: "http",
        hostname: "127.0.0.1",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "192.168.135.72",
        port: "8000",
        pathname: "/media/**",
      },
      {
        protocol: "http",
        hostname: "0.0.0.0",
        port: "8000",
        pathname: "/media/**",
      },
    ],
  },
};

export default nextConfig;