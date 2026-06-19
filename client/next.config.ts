import type { NextConfig } from "next";

const AUTH_SERVICE_URL =
  process.env.AUTH_SERVICE_URL ?? "http://auth-srv";

const nextConfig: NextConfig = {
  allowedDevOrigins: ["nas-ticketing.dev"],
  async rewrites() {
    return [
      {
        source: "/api/users/:path*",
        destination: `${AUTH_SERVICE_URL}/api/users/:path*`,
      },
    ];
  },
};

export default nextConfig;
