import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  env: {
    API_URL: "http://localhost:3000",
    DB_LOCAL_URI: "mongodb://127.0.0.1:27017/BookIT",
    DB_PROD_URI: "",
  },
  images: {
    domains: ["res.cloudinary.com"],
  },
};

export default nextConfig;
