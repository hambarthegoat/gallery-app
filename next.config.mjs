/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                hostname: "formal-akita-389.convex.cloud"
            }
        ]
    }
};

export default nextConfig;
