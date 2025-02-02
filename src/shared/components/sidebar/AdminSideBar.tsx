"use client"
import { FC, useEffect } from "react";
import {
    Newspaper,
    Settings2,
    SquareTerminal,
    Users,
} from "lucide-react";

import {
    Sidebar,
    SidebarContent,
    SidebarFooter,
    SidebarRail,
} from "@/shared/ui/sidebar";
import { NavMain } from "@/shared/components/sidebar/navMain";
import { NavUser } from "@/shared/components/sidebar/navUser";

import useProfileStore from "@/store/useProfileStore";

export const AdminSideBar: FC = () => {
    const profile = useProfileStore(state => state.profile);
    const isProfileLoading = useProfileStore(state => state.isProfileLoading);
    const fetchProfile = useProfileStore(state => state.fetchProfile);

    useEffect(() => {
        if (!profile && !isProfileLoading) {
            fetchProfile();
        }
    }, [profile, fetchProfile]);

    const data = {
        navMain: [
            {
                title: "Home",
                url: "#",
                icon: SquareTerminal,
                isActive: true,
                items: [
                    { title: "History", url: "#" },
                    { title: "Starred", url: "#" },
                    { title: "Settings", url: "#" },
                ],
            },
            {
                title: "News",
                url: "#",
                icon: Newspaper,
                items: [
                    { title: "List of News", url: "/admin/news/" },
                    { title: "Create News", url: "/admin/news/create" },
                ],
            },
            {
                title: "Members",
                url: "#",
                icon: Users,
                items: [
                    { title: "List of Members", url: "#" },
                    { title: "Add new Member", url: "#" },
                    { title: "Delete Member", url: "#" },
                ],
            },
            {
                title: "Settings",
                url: "#",
                icon: Settings2,
                items: [
                    { title: "General", url: "#" },
                    { title: "Team", url: "#" },
                    { title: "Billing", url: "#" },
                    { title: "Limits", url: "#" },
                ],
            },
        ],
    };

    if (isProfileLoading) {
        return <div>Loading...</div>;
    }

    const user = profile || {
        name: "shadcn",
        email: "m@example.com",
        imageURL: "/avatars/shadcn.jpg",
    };

    return (
        <Sidebar collapsible="icon">
            <SidebarContent>
                <NavMain items={data.navMain} />
            </SidebarContent>
            <SidebarFooter>
                <NavUser user={{ email: user.email, name: user.name, imageURL: user.imageURL }} />
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
};
