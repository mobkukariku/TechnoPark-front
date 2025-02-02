"use client"
import {FC, useCallback, useEffect} from "react";
import useNewsStore from "@/store/useNewsStore";
import {NewsPageItem} from "@/shared/components/news/NewsPageItem";
import {Container} from "@/shared/components";

export const NewsPageList:FC = () => {

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
        <Container>
            <div>
                <p className={"uppercase text-[32px] my-[30px] font-bold"}>Новости</p>
                <div className={"flex flex-col gap-[35px] max-w-[915px]"}>
                    {newsData.map((item, index) => (
                        <NewsPageItem title={item.title} content={item.content} imageURL={item.imageURL} createdAt={item.createdAt} />
                    ))}
                </div>
            </div>
        </Container>
    )
}