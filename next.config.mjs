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
      const isDocker = Boolean(process.env.DOCKER_CONTAINER || process.env.WATCHPACK_POLLING);
      config.watchOptions = {
        ...(config.watchOptions || {}),
        aggregateTimeout: 200,
        ...(isDocker ? { poll: 1000 } : {}),
        ignored: /[\\/](node_modules|\.git|\.next|dist|\.turbo|coverage|test-results|playwright-report|\.stryker-tmp)[\\/]/,
      };
    }
    return config;
  },
};

export default nextConfig;


