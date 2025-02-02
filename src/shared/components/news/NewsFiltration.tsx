"use client";
import { FC, useEffect } from "react";
import {Checkbox, Input} from "@/shared/ui";
import useNewsStore from "@/store/useNewsStore";
import {SortingSelect} from "@/shared/components/news/SortingSelect";

export const NewsFiltration: FC = () => {
    const { search, tags, setSearch, setTags,  fetchNewsData, isLoading, sort, setSort } = useNewsStore();

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearch(e.target.value);
    };

    const handleTag = (tag: string) => {
        const isChecked = tags.includes(tag);
        const updatedTags = isChecked
            ? tags.replace(new RegExp(`\\b${tag}\\b,?`, 'g'), '')
            : tags ? `${tags},${tag}` : tag;

        setTags(updatedTags);
    };


    const handleSort = (value: string) => {
        setSort(value);
    }


    useEffect(() => {
       if(!isLoading) {
           fetchNewsData();
       }
    }, [search, tags, sort]);

    return (
        <div className="w-[280px] flex flex-col gap-[20px] relative z-50">
            <p className="text-[20px] font-semibold">Фильтрация</p>

            <Input className="w-full bg-white relative z-50" placeholder="Поиск" value={search} onChange={handleSearch} />

            <div className="flex flex-col gap-[10px]">
                <p className="opacity-40 font-semibold">Теги</p>
                <div className="flex flex-col gap-[15px]">
                    {["guests", "events", "competitions", "other"].map(tag => (
                        <div key={tag} className={"flex items-center gap-[5px] peer"}>
                            <Checkbox id={tag} value={tag} onClick={() => handleTag(tag)} />
                            <label
                                htmlFor={tag}
                                className=" font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                            >
                                {tag}
                            </label>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex flex-col gap-[10px]">
                <p className="opacity-40 font-semibold">Сортировка</p>
                <SortingSelect value={sort} hadnleChange={handleSort} />
            </div>
        </div>
    );
};
