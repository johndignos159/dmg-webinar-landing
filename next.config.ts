import type {NextConfig} from 'next';

const nextConfig: NextConfig = {
  reactStrictMode: true,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: false,
  },
  // No remotePatterns needed — every image is now served from public/.
  // Re-add a pattern here only if an image is ever loaded from another domain.
  // output: 'standalone' removed. It is for self-hosted/Docker deploys and
  // deliberately omits public/ and .next/static from the bundle, so the logo
  // and stylesheet can fail to serve. Vercel does not need it.
  transpilePackages: ['motion'],
  webpack: (config, {dev}) => {
    // HMR is disabled in AI Studio via DISABLE_HMR env var.
    // Do not modifyâfile watching is disabled to prevent flickering during agent edits.
    if (dev && process.env.DISABLE_HMR === 'true') {
      config.watchOptions = {
        ignored: /.*/,
      };
    }
    return config;
  },
};

export default nextConfig;
