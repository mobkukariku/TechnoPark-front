"use client";

import { FC, useEffect, useState } from "react";
import { getNews } from "@/api/newsApi";
import {
    Carousel,
    CarouselContent,
    CarouselItem,
} from "@/shared/ui/carousel";
import { NewsItem } from "@/shared/components";
import { ShortNewsSkeleton } from "@/shared/components/landing";

interface ShortNewsProps {
    id: string;
    title: string;
    imageURL: string;
    createdAt: string;
}

export const ShortNewsCarousel: FC = () => {
    const [newsData, setNewsData] = useState<ShortNewsProps[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const fetchNews = async () => {
            try {
                const response:ShortNewsProps[] = await getNews({ page: 1, limit: 3, sort: "newest" }) as ShortNewsProps[];

                const formattedNews = response.map((item: ShortNewsProps) => ({
                    id: item.id,
                    title: item.title,
                    imageURL: item.imageURL,
                    createdAt: item.createdAt,
                }));

                setNewsData(formattedNews || []);
            } catch (error) {
                console.error("Ошибка при загрузке новостей:", error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchNews();
    }, []);

    return (
        <Carousel opts={{ align: "start" }} className="w-full my-[30px]">
            <CarouselContent>
                {!isLoading ? (
                    newsData.map((item, index) => (
                        <CarouselItem key={index} className="basis-1/3 max-[1000px]:basis-1/2 max-[500px]:basis-full">
                            <NewsItem id={item.id} imageURL={item.imageURL} title={item.title} createdAt={item.createdAt} />
                        </CarouselItem>
                    ))
                ) : (
                    Array.from({ length: 3 }).map((_, index) => (
                        <CarouselItem key={index} className="basis-1/3 max-[1000px]:basis-1/2 max-[500px]:basis-full">
                            <ShortNewsSkeleton />
                        </CarouselItem>
                    ))
                )}
            </CarouselContent>
        </Carousel>
    );
};
