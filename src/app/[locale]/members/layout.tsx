import { Inter } from "next/font/google";
import "../../globals.css";
import { HierarchySidebar} from "@/shared/components";
import { SidebarProvider, SidebarTrigger } from "@/shared/ui/sidebar";


export default function RootLayout({ children }: { children: React.ReactNode }) {
    return (
        <SidebarProvider>
            <HierarchySidebar />
            <SidebarTrigger />
            <main className="flex-1">{children}</main>
        </SidebarProvider>
    );
}
