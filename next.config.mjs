/** @type {import("next").NextConfig} */
const nextConfig = {
  basePath: "/js-calculator-nextjs",
  output: "export",
  distDir: "dist",
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
