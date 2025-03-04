"use client"
import {FC} from "react";
import {Input} from "@/shared/ui";

import useProjectsStore from "@/store/useProjectsStore";
import {CreateProjectsDialog} from "@/shared/components/admin/projects/CreateProjectsDialog";

export const AdminProjectsButtons:FC = () => {
    const { search, setSearch, } = useProjectsStore();
    return (
        <div>
            <div className="mt-[20px] mb-[10px] mr-[20px] flex justify-between">
                <Input placeholder="Search" className="w-[500px]" value={search} onChange={(e) => setSearch(e.target.value)} />
                <CreateProjectsDialog />
            </div>

        </div>
    )
}