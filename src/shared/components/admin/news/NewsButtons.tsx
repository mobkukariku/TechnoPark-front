"use client"
import {FC, useEffect} from "react";
import { Input} from "@/shared/ui";
import useNewsStore from "@/store/useNewsStore";
import {TagCheckboxes} from "@/shared/components";
import {CreateNewsDialog} from "@/shared/components/admin/news/CreateNewsDialog";


export const NewsButtons: FC = () => {
    const { search, setSearch, fetchNewsData, isLoading, filterTags } = useNewsStore();
    useEffect(() => { if (!isLoading) fetchNewsData(); }, [search, filterTags]);
    return (
        <div>
            <div className="mt-[20px] mb-[10px] mr-[20px] flex justify-between">
                <Input placeholder="Search" className="w-[500px]" value={search} onChange={(e) => setSearch(e.target.value)} />
                <CreateNewsDialog />
            </div>
           <div className={"my-[20px] "}>
               <TagCheckboxes className={"flex gap-[10px] flex-wrap"} isFilter={true} />
           </div>
        </div>
    );
};