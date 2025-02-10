import { Inter } from "next/font/google";
import "../globals.css";
import { AdminSideBar } from "@/shared/components";
import { SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar";

const inter = Inter({
    subsets: ["latin"],
    variable: "--font-inter",
});

export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <AdminSideBar />
            <SidebarTrigger />
            <main className="flex-1">{children}</main>
        </SidebarProvider>
    );
}
