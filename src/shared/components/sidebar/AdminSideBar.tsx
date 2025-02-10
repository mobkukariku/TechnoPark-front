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
                url: "/admin",
                icon: SquareTerminal,
            },
            {
                title: "News",
                url: "/admin/news",
                icon: Newspaper,
            },
            {
                title: "Members",
                url: "#",
                icon: Users,
            },
            {
                title: "Settings",
                url: "#",
                icon: Settings2,
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
