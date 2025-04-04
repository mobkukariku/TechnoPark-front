"use client";
import { FC, useEffect } from "react";
import {
  Network,
  Newspaper,
  Presentation,
  SquareTerminal,
  Users,
  Handshake,
  FileUser,
  BriefcaseBusiness,
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
  const profile = useProfileStore((state) => state.profile);
  const isProfileLoading = useProfileStore((state) => state.isProfileLoading);
  const fetchProfile = useProfileStore((state) => state.fetchProfile);

  useEffect(() => {
    if (!profile && !isProfileLoading) {
      fetchProfile();
    }
  }, [profile, fetchProfile, isProfileLoading]);

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
      {
        title: "Departments",
        url: "/admin/departments",
        icon: Network,
      },
      {
        title: "Partners",
        url: "/admin/partners",
        icon: Handshake,
      },
      {
        title: "Job-Applications",
        url: "/admin/job-applications",
        icon: FileUser,
      },
      {
        title: "Job-Roles",
        url: "/admin/job-roles",
        icon: BriefcaseBusiness,
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
          <NavUser user={{ email: user.email, name: user.name }} />
        )}
      </SidebarFooter>
      <SidebarRail />
    </Sidebar>
  );
};
