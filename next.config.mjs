import path from 'node:path';

/** @type {import('next').NextConfig} */
const nextConfig = {
  outputFileTracingRoot: path.resolve(process.cwd(), '..'),
  reactStrictMode: true,
  output: 'standalone',
  transpilePackages: ['@kannan19302/shared', '@kannan19302/ui', '@kannan19302/framework'],
  serverExternalPackages: ['@prisma/adapter-pg', 'pg'],
  webpack: (config, { dev }) => {
    if (dev) {
      config.watchOptions = {
        ...(config.watchOptions || {}),
        poll: 1000,
        aggregateTimeout: 300,
        ignored: /node_modules/,
      };
    }
    return config;
  },
};

export default nextConfig;


