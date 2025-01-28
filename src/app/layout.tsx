import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import {Header} from "@/shared/components";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export const metadata: Metadata = {
    title: "SDU Technopark",
    description: "Инновационный технопарк в рамках СДУ, предлагающий стартапам и компаниям уникальные условия для роста и развития.",
    openGraph: {
        title: "СДУ Технопарк",
        description: "Инновационный технопарк в рамках СДУ, предлагающий стартапам и компаниям уникальные условия для роста и развития.",
        url: "https://your-site.com",
        siteName: "СДУ Технопарк",
    },
};


export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body
        className={`${inter.variable} `}
      >
      <Header />
        {children}
      </body>
    </html>
  );
}
