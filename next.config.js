/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    domains: ["images.unsplash.com", "i.ytimg.com", ],
  },
};

module.exports = nextConfig

// module.exports = {
//   images: {
//     domains: ["https://images.unsplash.com/"],
//   },
// };