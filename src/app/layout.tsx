import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({ subsets: ["latin", "cyrillic"] }); // Добавил кириллицу

export const metadata: Metadata = {
    title: "SDU Technopark",
    description: "Инновационный технопарк в рамках СДУ.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <html lang="ru">
        <body className={inter.className}>{children}</body>
        </html>
    );
}
