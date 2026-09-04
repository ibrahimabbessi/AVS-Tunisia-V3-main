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
      // ✅ NEW: Add the hosts from your e-learning page
      {
        protocol: 'https',
        hostname: 'www.esade.edu',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.subtop.fr',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.freelance-informatique.fr',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.shutterstock.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'www.comundi.fr',
        port: '',
        pathname: '/**',
      },
            {
        protocol: 'https',
        hostname: 'onlinelearning2017.ca',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'digital-staffing.fr',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'static.wixstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'encrypted-tbn0.gstatic.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'res.cloudinary.com',
        port: '',
        pathname: '/**',
      },
    ],
  },
};

export default nextConfig;