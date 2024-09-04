/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "nwsfywcbwulcsggurrwc.supabase.co",
        port: "",
        pathname: "/storage/v1/object/public/Teachers%20pics/**",
      },
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
        port: "",
        pathname:
          "/a/**",
      },
    ],
  },
};


 export default nextConfig;
