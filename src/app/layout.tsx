import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] }); // Добавил кириллицу

export const metadata: Metadata = {
    title: "SDU Technopark",
    description: "Инновационный технопарк в рамках СДУ.",
    icons:  { icon: "/favicon.ico" },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
        <head>
            <link rel="icon" href="/favicon.ico" sizes="any" />
            <link rel="icon" type="image/png" href="/favicon-32x32.png" />
            <link rel="apple-touch-icon" href="/apple-touch-icon.png" />
        </head>
        <body className={inter.className}>{children}</body>
        </html>
    );
}
