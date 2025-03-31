"use client";
import { FC, useEffect } from "react";
import useNewsStore from "@/store/useNewsStore";
import { NewsPageItem } from "@/shared/components/news/NewsPageItem";
import { Container, NewsFiltration } from "@/shared/components";
import { NewsPagination } from "@/shared/components/news/NewsPagination";
import { NewsListSkeleton, NewsNotFound } from "@/shared/components/news";

export const NewsPageList: FC = () => {
    const { newsData, fetchNewsData, isLoading, page, totalPages, setPage, } = useNewsStore();

    useEffect(() => {
            fetchNewsData();
    }, [fetchNewsData, page]);



    const handlePageChange = (page: number) => {
        setPage(page);
        console.log(page)
    };

    return (
        <Container className="relative z-20 mt-[20px] ">
            <div className="flex flex-row max-[1000px]:justify-center max-[1000px]:flex-wrap-reverse">
                <div className="w-[915px] flex flex-wrap max-[1000px]:mt-[50px] relative z-20 mb-[20px] max-[500px]:mb-[50px]
                                max-[500px]:w-full max-[500px]:flex max-[500px]:justify-center">
                    <div className="max-[500px]:h-fit flex max-[1000px]:justify-center flex-col max-[1000px]:items-center
                                    max-[500px]:w-full max-[500px]:items-center">
                        <p className="uppercase text-[32px] max-[500px]:text-[24px] mb-[30px] font-bold max-[500px]:text-center">Новости</p>
                        <div className="flex flex-col gap-[35px] max-[500px]:items-center">
                            {isLoading ? (
                                <NewsListSkeleton />
                            ) : newsData.length > 0 ? (
                                newsData.map((news, index) => (
                                    <NewsPageItem key={news.id} {...news} index={index} />
                                ))
                            ) : (
                                <NewsNotFound />
                            )}

                        </div>
                    </div>
                </div>
                <NewsFiltration />
            </div>
            <div className="mb-[20px]">
                <NewsPagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
            <div className="absolute z-0 rounded-full left-[-200px] max-[500px]:w-[200px] max-[500px]:h-[200px] blur-[100px] max-[500px]:left-[-20px] max-[500px]:top-[50px] opacity-70 top-[200px] w-[300px] h-[300px] bg-[#4E48FE5C]" />
            <div className="absolute z-0 rounded-full right-[-200px] max-[500px]:w-[250px] max-[500px]:h-[250px] blur-[100px] opacity-70 max-[500px]:right-[0px] max-[500px]:top-[300px] top-[550px] w-[330px] h-[330px] bg-[#1170FF5C]" />
        </Container>
    );
};
