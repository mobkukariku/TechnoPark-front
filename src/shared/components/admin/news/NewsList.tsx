"use client";
import { FC, useEffect } from "react";
import useNewsStore from "@/store/useNewsStore";
import { AdminNewsItem } from "./AdminNewsItem";
import { NewsPagination } from "@/shared/components/news/NewsPagination";
import toast, { Toaster } from 'react-hot-toast';

export const NewsList: FC = () => {
    const { newsData, fetchNewsData, page, totalPages, setPage, setLimit, deleteNews } = useNewsStore();

    useEffect(() => {
        setLimit(10);
    }, [setLimit]);

    useEffect(() => {
        fetchNewsData();
    }, [fetchNewsData, page]);


    const handlePageChange = (page: number) => {
        setPage(page);
    };

    const handleDelete = async (id: string) => {
        try {
            await deleteNews(id);
            toast.success("Успешно удалено!");
            await fetchNewsData();
        } catch (error) {
            console.error("Ошибка при удалении новости:", error);
            toast.error("Ошибка при удалений!");
        }
    };

    return (
        <div>
            <div className="mr-[20px] rounded-[22px] p-[20px] flex flex-col gap-[10px]">
                {newsData.map((news) => (
                    <AdminNewsItem
                        key={news.id }
                        id={news.id}
                        imageURL={news.imageURL || ""}
                        title={news.title}
                        createdAt={news.createdAt}
                        onDelete={handleDelete}
                    />
                ))}
            </div>
            <div className="my-[20px]">
                <NewsPagination currentPage={page} totalPages={totalPages} onPageChange={handlePageChange} />
            </div>
            <Toaster />
        </div>
    );
};
