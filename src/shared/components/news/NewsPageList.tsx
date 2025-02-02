"use client"
import {FC, useCallback, useEffect} from "react";
import useNewsStore from "@/store/useNewsStore";
import {NewsPageItem} from "@/shared/components/news/NewsPageItem";
import {Container, Header, NewsFiltration} from "@/shared/components";
import {NewsPagination} from "@/shared/components/news/NewsPagination";

export const NewsPageList:FC = () => {

    const { newsData, fetchNewsData, isLoading, page, totalPages, setPage } = useNewsStore();

    useEffect(() => {
        if(!isLoading) {
            fetchNewsData();
        }
    }, [newsData, page, totalPages, isLoading]);
    const handlePageChange = (page: number) => {
        setPage(page);
    };

    return (
        <Container className={"flex relative z-50 mt-[20px]"}>
            <div className={"w-[915px] relative z-50 mb-[100px]"}>
                <div className={"h-[1100px] "}>
                    <p className={"uppercase text-[32px] mb-[30px] font-bold"}>Новости</p>
                    <div className={"flex flex-col gap-[35px] "}>
                        {newsData.map((item, index) => (
                            <NewsPageItem key={index} title={item.title} content={item.content}
                                          imageURL={item.imageURL} createdAt={item.createdAt}/>
                        ))}
                    </div>
                </div>
                <NewsPagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange}/>
            </div>
            <NewsFiltration/>
            <div
                className={"absolute z-0 rounded-full left-[-200px]  blur-[100px] opacity-70 top-[0px] w-[300px] h-[300px] bg-[#4E48FE5C]"}/>
            <div
                className={"absolute z-0 rounded-full right-[-80px] opacity-70 blur-[100px] top-[390px] w-[330px] h-[330px] bg-[#1170FF5C]"}/>
        </Container>
    )
}