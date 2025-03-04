"use client";

import { FC, useEffect } from "react";
import useNewsStore from "@/store/useNewsStore";
import Link from "next/link";

export const NewsSideBar: FC<{ _id: string | Array<string> | undefined }> = ({ _id }) => {
    const { lastNews, setLastNews, isLastNewsLoading } = useNewsStore();


    const formatDate = (date?: string) => {
        if (!date) return;
        return new Date(date).toLocaleDateString("ru-RU");
    };

    useEffect(() => {
        setLastNews(_id)
    }, []);

    return (
        <div className="w-[250px] ">
            <p className="text-center font-semibold text-[20px] mt-[10px]">Последние новости</p>
            <div className="max-w-[290px] mt-[21px] flex flex-col gap-[20px]">
                {lastNews.map((item) => (
                    <div key={item.id} className="flex flex-col gap-[6px]">
                        <Link href={`/news/${item.id}`}>
                            <h2 className="font-medium cursor-pointer hover:text-[#5998FF] transition-colors">
                                {item.title}
                            </h2>
                        </Link>
                        <p className="text-[#444444] text-[14px]">{formatDate(item.createdAt)}</p>
                        <hr className="border-[#CDCDCD]" />
                    </div>
                ))}
            </div>
        </div>
    );
};
