import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
<<<<<<< HEAD
        hostname: "myanimelist.net",
        pathname: "/images/**",
      },
      {
        protocol: "https",
        hostname: "cdn.myanimelist.net",

=======
        hostname: "cdn.myanimelist.net",
        port: "",
>>>>>>> parent of 682592c (Revert "Next.js+go")
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
