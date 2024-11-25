/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "www.course-api.com", //
        // - To safely allow optimizing images, define a list of supported URL patterns in next.config.mjs. Be as specific as possible to prevent malicious usage.

        port: "",
        pathname: "/images/**",
      },
    ],
  },
};

export default nextConfig;
