// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  images: {
    unoptimized: true, // Отключить оптимизацию изображений
  },
  distDir: './dist', // Измените каталог сборки, если необходимо
};

export default nextConfig;