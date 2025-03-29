"use client";
import { FC, useEffect, useState } from "react";
import { TreeDataItem, TreeView } from "@/shared/ui/tree-view";
import { axiosInstance } from "@/api/axiosInstance";
import { useRouter } from "next/navigation";
import { Sidebar, SidebarHeader } from "@/shared/ui/sidebar";
import {transformDepartmentsToTree} from "@/shared/components/members/transformDepartmentsToTree";
import Link from "next/link";
import Image from "next/image";


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
    }, [router]);

    if (loading) return <p>Загрузка...</p>;
    if (error) return <p>{error}</p>;

    return (
        <Sidebar>
            <SidebarHeader>
                <div className={"flex my-[20px] justify-center"}>
                    <Link href={"/"} >
                        <Image src={"/logo.svg"} alt={"logo"} width={100} height={100} />
                    </Link>
                </div>
            </SidebarHeader>
            <hr  />
            <TreeView data={data} />
        </Sidebar>
    );
};
