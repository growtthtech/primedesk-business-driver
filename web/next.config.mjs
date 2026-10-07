/** @type {import('next').NextConfig} */
const nextConfig = {
  async rewrites() {
    // Spec aliases: same pages, no duplicated implementations.
    return [
      { source: "/my-map", destination: "/map" },
      { source: "/my-plan", destination: "/plan" },
      { source: "/my-drive", destination: "/drive" },
    ];
  },
};
export default nextConfig;
