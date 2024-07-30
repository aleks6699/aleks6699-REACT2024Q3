// next.config.js
/** @type {import('next').NextConfig} */
 const nextConfig = {
  images: {
    unoptimized: true, // Отключить оптимизацию изображений
  },
  distDir: './dist',
  reactStrictMode: true,
  swcMinify: true,
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
