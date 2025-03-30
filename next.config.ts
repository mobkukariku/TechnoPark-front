import type { NextConfig } from "next";
import createNextIntlPlugin from 'next-intl/plugin';

const nextConfig: NextConfig = {
    images: {
        domains: [
            'my-mobkegram-bucket.s3.eu-north-1.amazonaws.com',
            'www.figma.com',
            'letsenhance.io',
            'localhost',
            'localhost:5000'
        ],
    },
    reactStrictMode: false,
};

const withNextIntl = createNextIntlPlugin();

export default withNextIntl(nextConfig);
