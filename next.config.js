/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        // matching all API routes
        source: "/api/v0/:path*",
        headers: [
          { key: "Access-Control-Allow-Credentials", value: "true" },
          { key: "Access-Control-Allow-Origin", value: "*" }, // replace this your actual origin
          {
            key: "Access-Control-Allow-Methods",
            value: "GET,DELETE,PATCH,POST,PUT",
          },
          {
            key: "Access-Control-Allow-Headers",
            value:
              "X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version, authorization",
          },
        ],
      },
    ];
  },
  // async rewrites() {
  //   return {
  //     beforeFiles: [
  //       {
  //         source: "/api/v0/:path*",
  //         destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/:path*`,
  //       },
  //     ],
  //     afterFiles: [
  //       {
  //         source: "/api/v0/:path*",
  //         destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/:path*`,
  //       },
  //     ],
  //     fallback: [
  //       {
  //         source: "/:path*",
  //         destination: `${process.env.NEXT_PUBLIC_SERVER_URL}/api/v0/:path*`,
  //       },
  //     ],
  //   };
  // },
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "avatars.githubusercontent.com",
        port: "",
      },
    ],
  },
  env: {
    NEXT_PUBLIC_GITHUB_ID: process.env.NEXT_PUBLIC_GITHUB_ID,
    NEXT_PUBLIC_SECRETKEY: process.env.NEXT_PUBLIC_SECRETKEY,
    AWS_RDS_URI: process.env.AWS_RDS_URI,
    NEXT_PUBLIC_SERVER_URL: process.env.NEXT_PUBLIC_SERVER_URL,
    NEXT_PUBLIC_CLIENT_URL: process.env.NEXT_PUBLIC_CLIENT_URL,
    NEXT_PUBLIC_CLOUDFRONT_URL: process.env.NEXT_PUBLIC_CLOUDFRONT_URL,
  },
  trailingSlash: true,
  experimental: {
    scrollRestoration: true,
    serverActions: true,
  },
  // swcMinify: true, # nextjs 13 to default
  poweredByHeader: false,
  reactStrictMode: false,
};
module.exports = nextConfig;
