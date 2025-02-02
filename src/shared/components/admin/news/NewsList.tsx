"use client"
import { FC, useEffect, useCallback } from "react";
import useNewsStore from "@/store/useNewsStore";
import Image from "next/image";
import {NewsItem} from "@/shared/components";
export const NewsList: FC = () => {
    const { newsData, fetchNewsData, isLoading } = useNewsStore();

    const fetchData = useCallback(() => {
        if (newsData.length===0 && !isLoading) {
            fetchNewsData();
        }
    }, [newsData,  fetchNewsData]);

    useEffect(() => {
        fetchData();
    }, [fetchData]);


    return (
        <div className={""}>
            <div className={"flex gap-2 "}>
                {newsData.map((news, index) => (
                    <NewsItem key={index} imageURL={news.imageURL} title={news.title} createdAt={news.createdAt} />
                ))}
            </div>
        </div>

    );
};
