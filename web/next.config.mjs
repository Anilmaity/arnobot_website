/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    unoptimized: true,
  },
  experimental: {
    // Resume uploads (the hiring assistant) are posted as multipart bodies.
    serverActions: { bodySizeLimit: '5mb' },
  },
};

export default nextConfig;
