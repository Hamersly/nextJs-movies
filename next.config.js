/** @type {import('next').NextConfig} */
const nextConfig = {
  async headers() {
    return [
      {
        source: '/api/:path*',
        headers: [
          { key: 'Access-Control-Allow-Credentials', value: 'true' },
          { key: 'Access-Control-Allow-Origin', value: '*' }, // replace this your actual origin
          { key: 'Access-Control-Allow-Methods', value: 'GET,DELETE,PATCH,POST,PUT' },
          { key: 'Access-Control-Allow-Headers', value: 'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version' },
        ]
      }
    ];
  },

  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
        port: '',
        pathname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
        port: '',
        pathname: '**',
      },
      // {
      //   protocol: 'https',
      //   hostname: 'image.tmdb.org',
      //   port: '',
      //   pathname: '**',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'tmdb.org',
      //   port: '',
      //   pathname: '**',
      // },
      // {
      //   protocol: 'https',
      //   hostname: 'themoviedb.org',
      //   port: '',
      //   pathname: '**',
      // },
      // {
      //   protocol: 'http',
      //   hostname: 'localhost',
      //   port: '',
      //   pathname: '**',
      // },
      // {
      //   protocol: 'http',
      //   hostname: '127.0.0.1',
      //   port: '',
      //   pathname: '**',
      // },
      // {
      //   protocol: 'http',
      //   hostname: 'next-js-movies-hamerslys-projects.vercel/app',
      //   port: '',
      //   pathname: '**',
      // },
    ],
  },
  typescript: {
    ignoreBuildErrors: true,
  }
};

module.exports = nextConfig;
