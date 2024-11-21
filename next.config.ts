import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    API_URL: "http://localhost:3000",
    DB_LOCAL_URI: "mongodb://127.0.0.1:27017/BookIT",
    DB_PROD_URI: "",

    NEXTAUTH_URL: "http://localhost:3000",
    NEXTAUTH_SECRET: "GBWERJHBGERHJWBGJERIBGRKELNGTRKHTRH",
  },
  images: {
    remotePatterns: [
      {
        protocol: "http", // or 'https' if using secure URLs
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "/udemy-courses/image/upload/**",
      },
      {
        protocol: "http", // or 'https' if using secure URLs
        hostname: "res.cloudinary.com",
        port: "",
        pathname: "dquzactsh/image/upload/v1732086848/BookIT/Products/**",
      },
    ],
  },
};

export default nextConfig;
