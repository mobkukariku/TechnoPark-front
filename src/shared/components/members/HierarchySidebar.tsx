"use client";
import { FC, useEffect, useState } from "react";
import { TreeDataItem, TreeView } from "@/shared/ui/tree-view";
import { axiosInstance } from "@/api/axiosInstance";
import { useRouter } from "next/navigation";
import { Sidebar, SidebarHeader } from "@/shared/ui/sidebar";
import {transformDepartmentsToTree} from "@/shared/components/members/transformDepartmentsToTree";


export const HierarchySidebar: FC = () => {
    const [data, setData] = useState<TreeDataItem[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const router = useRouter();

    useEffect(() => {
        const fetchDepartments = async () => {
            try {
                const res = await axiosInstance.get("/departments/tree");
                const transformedData = transformDepartmentsToTree(res.data, router);
                setData(transformedData);
            } catch {
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
                <h1 className="font-bold text-[20px]">Список Участников</h1>
            </SidebarHeader>
            <TreeView data={data} />
        </Sidebar>
    );
};
