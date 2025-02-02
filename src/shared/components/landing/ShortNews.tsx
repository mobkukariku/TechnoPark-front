"use client"
import {FC, useCallback, useEffect} from "react";
import {Container, NewsItem} from "@/shared/components";
import useNewsStore from "@/store/useNewsStore";
import Link from "next/link";
import Image from "next/image";

export const ShortNews:FC = () => {

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
        <div className={"bg-[#D8E7FF] py-[48px]"}>
            <Container>
                <p className={"text-[32px] font-bold"}>Новости:</p>
                <div className={"flex justify-around mt-[20px] mb-[40px]"}>
                    {newsData.slice(0, 3).map((item, index) => (
                        <NewsItem key={index} imageURL={item.imageURL} title={item.title} createdAt={item.createdAt} />
                    ))}
                </div>
                <Link href={"/news"} className={"text-center font-semibold text-[#2D7DFF] underline-offset-4 underline "}><p>Показать еще...</p></Link>
            </Container>

        </div>
    )
}