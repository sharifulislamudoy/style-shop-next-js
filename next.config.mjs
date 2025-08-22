/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['i.ibb.co.com'], // Use the correct domain with the extra .com
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'i.ibb.co.com', // Update this to match your image URLs
        port: '',
        pathname: '/**',
      },
    ],
  },
}

export default nextConfig;