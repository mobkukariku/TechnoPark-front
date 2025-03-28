import "../globals.css";
import { AdminSideBar } from "@/shared/components";
import { SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar";


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <main className="flex-1 ">{children}</main>
    );
}
