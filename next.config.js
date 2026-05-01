/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        domains: ["lh3.googleusercontent.com", "avatars.githubusercontent.com", "i.pravatar.cc"],
    },
    experimental: {
        serverActions: {
            bodySizeLimit: "2mb",
        },
    },
};

module.exports = nextConfig;
