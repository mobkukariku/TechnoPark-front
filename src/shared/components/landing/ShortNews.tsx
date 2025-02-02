"use client";
import { FC, useEffect, useState } from "react";
import { Container, NewsItem } from "@/shared/components";
import Link from "next/link";
import Image from "next/image";
import { getNews } from "@/api/api"; // Путь к функции для запроса новостей

interface ShortNewsProps {
    title: string;
    imageURL: string;
    createdAt: string;
}


export const ShortNews: FC = () => {
    const [newsData, setNewsData] = useState<ShortNewsProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response = await getNews({ page: 1, limit: 3, sort: "newest" });
                setNewsData(response.news || []);
                setIsLoading(false);
            } catch (error) {
                console.error("Ошибка при загрузке новостей:", error);
                setIsLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <div className={"relative"}>
            <div className={"bg-[#D8E7FF] relative z-50"}>
                <div className={"py-[48px]"}>
                    <Container className={"relative z-50"}>
                        <p className={"text-[32px] font-bold"}>Новости:</p>
                        <div className={"flex justify-around mt-[20px] mb-[40px]"}>
                            {isLoading ? (
                                <p>Загрузка...</p>
                            ) : (
                                newsData.map((item, index) => (
                                    <NewsItem
                                        key={index}
                                        imageURL={item.imageURL}
                                        title={item.title}
                                        createdAt={item.createdAt}
                                    />
                                ))
                            )}
                        </div>
                        <Link
                            href={"/news"}
                            className={"text-center font-semibold text-[#2D7DFF] underline-offset-4 underline "}
                        >
                            <p>Показать еще...</p>
                        </Link>
                    </Container>
                </div>
            </div>
            <div className={"max-w-[1700px] mx-auto"}>
                <Image
                    src={"landing/element.svg"}
                    width={846}
                    height={819}
                    alt={"element"}
                    className={"top-[-600px] absolute z-0"}
                />
            </div>
        </div>
    );
};
