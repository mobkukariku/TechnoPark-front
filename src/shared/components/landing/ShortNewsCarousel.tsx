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
import { motion } from "framer-motion";
import { useHasBeenInView } from "@/hooks/useHasBeenInView"; // Подключаем кастомный хук

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
                const response: ShortNewsProps[] = await getNews({ page: 1, limit: 3, sort: "newest" }) as ShortNewsProps[];

                setNewsData(response || []);
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
                    newsData.map((item, index) => {
                        const { ref, hasBeenInView } = useHasBeenInView();

                        return (
                            <CarouselItem key={index} className="basis-1/3 max-[1000px]:basis-1/2 max-[500px]:basis-full">
                                <motion.div
                                    ref={ref}
                                    initial={{ opacity: 0, filter: "blur(10px)" }}
                                    animate={hasBeenInView ? { opacity: 1, filter: "blur(0px)" } : {}}
                                    transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
                                >
                                    <NewsItem id={item.id} imageURL={item.imageURL} title={item.title} createdAt={item.createdAt} />
                                </motion.div>
                            </CarouselItem>
                        );
                    })
                ) : (
                    Array.from({ length: 3 }).map((_, index) => {
                        const { ref, hasBeenInView } = useHasBeenInView();

                        return (
                            <CarouselItem key={index} className="basis-1/3 max-[1000px]:basis-1/2 max-[500px]:basis-full">
                                <motion.div
                                    ref={ref}
                                    initial={{ opacity: 0, filter: "blur(10px)" }}
                                    animate={hasBeenInView ? { opacity: 1, filter: "blur(0px)" } : {}}
                                    transition={{ duration: 0.6, ease: "easeOut", delay: index * 0.2 }}
                                >
                                    <ShortNewsSkeleton />
                                </motion.div>
                            </CarouselItem>
                        );
                    })
                )}
            </CarouselContent>
        </Carousel>
    );
};
