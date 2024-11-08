/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https', // Usa 'https' si tu R2 está configurado para HTTPS
        hostname: 'eb89ab36949a79ac70eaa882b4ef720c.r2.cloudflarestorage.com',
        pathname: '/**', // Permite acceder a cualquier archivo en el bucket
      },
      {
        protocol: 'http',
        hostname: '127.0.0.1', // 192.168.1.6
        port: '8000',
        pathname: '/media/**',
      },
    ],
  },
};

export default nextConfig;
