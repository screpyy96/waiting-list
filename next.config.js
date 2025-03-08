/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      'images.unsplash.com',
      'firebasestorage.googleapis.com'
    ],
  },
  optimizeFonts: true,
  experimental: {
    optimizeCss: true
  },
  // Disable CSS optimization in development
  webpack: (config, { dev }) => {
    if (dev) {
      config.optimization.minimizer = [];
    }
    return config;
  },
}

module.exports = nextConfig 