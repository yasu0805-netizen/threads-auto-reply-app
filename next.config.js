/** @type {import('next').NextConfig} */
const nextConfig = {
  // VercelでSSR/Edge機能を使えるよう static export を解除
  reactStrictMode: true,
  // もし今後 Image Optimization や Middleware を使うならここに追記
};

module.exports = nextConfig;