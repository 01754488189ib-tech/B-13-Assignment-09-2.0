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
  reactCompiler: true,
  serverExternalPackages: ['@better-auth/kysely-adapter', 'kysely', 'mongodb'],
};

export default nextConfig;