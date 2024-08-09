/** @type {import('next').NextConfig} */

const remoteUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;

// split the https:// from the url
const [protocol, url] = remoteUrl.toString().split('://');

const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: protocol,
        hostname: url,
        port: '',
      },
    ],
  },
};

export default nextConfig;
