/** @type {import('next').NextConfig} */
const nextConfig = {
    transpilePackages: ['react-daisyui'],
    reactStrictMode: true,
    images: {
        remotePatterns: [
          {
            protocol: 'https',
            hostname: 'source.unsplash.com',
            port: '',
            pathname: '/random/**',
          },
        ],
      },
}

module.exports = nextConfig
