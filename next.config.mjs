/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    // allow next/font to download Google Fonts behind corporate/system TLS
    turbopackUseSystemTlsCerts: true,
  },
};

export default nextConfig;
