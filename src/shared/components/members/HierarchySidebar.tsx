"use client";
import { FC, useEffect, useState } from "react";
import { TreeDataItem, TreeView } from "@/shared/ui/tree-view";
import { axiosInstance } from "@/api/api";
import { useRouter } from "next/navigation";
import {Sidebar, SidebarHeader} from "@/shared/ui/sidebar";

export const HierarchySidebar: FC = () => {
    const [data, setData] = useState<TreeDataItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const res = await axiosInstance.get("/departments/hierarchy");
                const transformedData = transformDepartmentsToTree(res.data, router);
                setData(transformedData);
            } catch (err) {
                setError("Ошибка загрузки иерархии");
            } finally {
                setLoading(false);
            }
        };

        fetchDepartments();
    }, []);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Sidebar>
            <SidebarHeader>
                <h1 className={"font-bold text-[20px]"}>Список Участников</h1>
            </SidebarHeader>
            <TreeView data={data} />
        </Sidebar>
    );
};

const transformDepartmentsToTree = (departments: any[], router: any): TreeDataItem[] => {
    return departments.map((dept) => {
        const head = dept.headId
            ? {
                id: `head-${dept.headId._id}`,
                name: `👤 ${dept.headId.name} ${dept.headId.surname}`,
                onClick: () => router.push(`/members/${dept.headId._id}`),
            }
            : { id: "no-head", name: "Без главы" };

        const members = dept.members?.length
            ? dept.members.map((m: any) => ({
                id: `member-${m._id}`,
                name: `👥 ${m.name} ${m.surname}`,
                onClick: () => router.push(`/members/${m._id}`),
            }))
            : [];

        return {
            id: dept._id,
            name: `🏢 ${dept.name}`,
            children: [head, ...members, ...(dept.subDepartments?.length ? transformDepartmentsToTree(dept.subDepartments, router) : [])],
        };
    });
};
