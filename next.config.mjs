/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  distDir: 'docs',
  output: 'export',
  images: {
    unoptimized: true,
  },
};

export default nextConfig;
