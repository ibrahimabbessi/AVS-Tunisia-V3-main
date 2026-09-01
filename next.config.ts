import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'thumbs.dreamstime.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.vecteezy.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**', // Allows all paths on Cloudinary
      },
            {
        protocol: 'https',
        hostname: 'www.dynamique-mag.com',
        port: '',
        pathname: '/wp-content/uploads/**',
      },
    ],
  },
};

export default nextConfig;