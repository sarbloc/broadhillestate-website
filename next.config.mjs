/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'https',
        hostname: 'downloads.ctfassets.net',
        port: '',
        pathname: '**',
      },
    ],
  },
  // Optimize for static generation and Edge runtime
  experimental: {
    optimizePackageImports: ['lucide-react', '@radix-ui/react-icons'],
  },
};

export default nextConfig;
