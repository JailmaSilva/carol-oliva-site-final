/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  images: { unoptimized: true }, // para next/image em export estático
};

module.exports = nextConfig;
