"use client"
import { FC, useEffect } from "react";
import {
    Newspaper,
    Presentation,
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

    console.log(profile)

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
                url: "/admin/members",
                icon: Users,
            },
            {
                title: "Projects",
                url: "/admin/projects",
                icon: Presentation,
            },
        ],
    };

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
                {isProfileLoading ? (
                    <div>Loading...</div>
                ) : (
                    <NavUser user={{ email: user.email, name: user.name}} />
                )}
            </SidebarFooter>
            <SidebarRail />
        </Sidebar>
    );
};
