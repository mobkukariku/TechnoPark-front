import type { NextConfig } from "next";

const nextConfig: NextConfig = {
    images: {
        domains: [
            'my-mobkegram-bucket.s3.eu-north-1.amazonaws.com',
            'www.figma.com',
            'letsenhance.io',
            'localhost',
            'localhost:4000'
        ], // Разрешенные домены
    },
};

export default nextConfig;
