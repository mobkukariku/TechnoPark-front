"use client";
import { FC, useEffect } from "react";
import useNewsStore from "@/store/useNewsStore";
import { AdminNewsItem } from "./AdminNewsItem";
import { NewsPagination } from "@/shared/components/news/NewsPagination";

export const NewsList: FC = () => {
    const { newsData, fetchNewsData, isLoading, page, totalPages, setPage, setLimit, deleteNews } = useNewsStore();

    useEffect(() => {
        if (!isLoading) {
            fetchNewsData();
        }
        setLimit(10);
    }, [page]);

    const handlePageChange = (page: number) => {
        setPage(page);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteNews(id);
            await fetchNewsData();
        } catch (error) {
            console.error("Ошибка при удалении новости:", error);
        }
    };

    return (
        <div className={""}>
            <div className={"grid grid-cols-4 mr-[20px] rounded-[22px] bg-[#D8E7FF] p-[20px] gap-5"}>
                {newsData.map((news) => (
                    <AdminNewsItem
                        key={news._id}
                        id={news._id}
                        imageURL={news.imageURL}
                        title={news.title}
                        createdAt={news.createdAt}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
            <div className={"my-[20px]"}>
                <NewsPagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
        </div>
    );
};
