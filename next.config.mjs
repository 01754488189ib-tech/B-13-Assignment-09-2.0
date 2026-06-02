/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  reactCompiler: false,
  serverExternalPackages: [
    'better-auth',
    '@better-auth/mongo-adapter',
    '@better-auth/kysely-adapter',
    'kysely',
    'mongodb'
  ],
};

export default nextConfig;