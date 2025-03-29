"use client"
import useNewsStore from "@/store/useNewsStore";
import {FC, useEffect} from "react";
import {Input} from "@/shared/ui";
import {TagCheckboxes} from "@/shared/components";
import {SortingSelect} from "@/shared/components/news/SortingSelect";

export const NewsFiltration: FC = () => {
    const { search, setSearch, fetchNewsData, isLoading, sort, setSort, filterTags } = useNewsStore();
    useEffect(() => { if (!isLoading) fetchNewsData(); }, [search, sort, filterTags, isLoading, fetchNewsData]);
    return (
        <div className="w-[280px] max-[1000px]:w-full flex flex-col gap-[20px] max-[500px]:gap-[10px] relative z-50">
            <p className="text-[20px] font-semibold">Фильтрация</p>
            <Input className="w-full bg-white" placeholder="Поиск" value={search} onChange={(e) => setSearch(e.target.value)} />
            <div className="flex flex-col gap-[10px]">
                <p className="opacity-40 font-semibold">Теги</p>
                <TagCheckboxes className={"flex flex-wrap gap-2"} isFilter={true} />
            </div>
            <div className="flex flex-col gap-[10px]">
                <p className="opacity-40 font-semibold">Сортировка</p>
                <SortingSelect value={sort} hadnleChange={setSort} />
            </div>
        </div>
    );
};
