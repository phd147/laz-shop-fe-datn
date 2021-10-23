module.exports = {

  devIndicators: {
    autoPrerender: false,
  },
  typescript: {
    // !! WARN !!
    // Dangerously allow production builds to successfully complete even if
    // your project has type errors.
    // !! WARN !!
    ignoreBuildErrors: true,
  },
  // async rewrites() {
  //   return [
  //     {
  //       source: '/api/:path*',
  //       destination: 'http://localhost:5000/api/:path*' // Proxy to Backend
  //     }
  //   ]
  // }
  images: {
    domains: ['phd-bucket-1999.s3.ap-southeast-1.amazonaws.com'],
  },
}
