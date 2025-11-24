/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    domains: ['placehold.co'],
    unoptimized: true,
  },
  // GitHub Pages configuration (uncomment when deploying to GitHub Pages)
  // basePath: '/freee-anime-legal-app',
  // assetPrefix: '/freee-anime-legal-app/',
}

module.exports = nextConfig