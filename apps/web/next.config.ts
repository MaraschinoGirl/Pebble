// apps/web/next.config.ts
import type { NextConfig } from 'next';
import withPWA from 'next-pwa';

const withPWAInit = withPWA({
  dest: 'public',
  disable: process.env.NODE_ENV !== 'production',
  register: true,
  skipWaiting: true,
});

const nextConfig: NextConfig = {
  reactStrictMode: true,
  experimental: { typedRoutes: true },
};

export default withPWAInit(nextConfig);
