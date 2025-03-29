"use client";
import { FC, useEffect } from "react";
import { Container } from "@/shared/components";
import { NewsSideBar } from "@/shared/components/news/selectnews";
import Image from "next/image";
import useNewsStore from "@/store/useNewsStore";
import { CurrentNewsSkeleton } from "@/shared/components/news/selectnews/CurrentNewsSkeleton";
import { motion, AnimatePresence } from "framer-motion";

export const CurrentNewsInfo: FC<{ newsId: string | Array<string> | undefined }> = ({ newsId }) => {
    const { currentNews, setCurrentNews, isLoading } = useNewsStore();

    useEffect(() => {
        setCurrentNews(newsId);
    }, [newsId, setCurrentNews]);

    const formatDate = (date?: string) => {
        if (!date) return;
        return new Date(date).toLocaleDateString("ru-RU");
    };

    return (
        <Container className={"mb-[200px]"}>
            <div>
                <AnimatePresence mode="wait">
                    {isLoading ? (
                        <motion.div
                            key="skeleton"
                            initial={{ opacity: 1 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2 }}
                        >
                            <CurrentNewsSkeleton />
                        </motion.div>
                    ) : (
                        <motion.div
                            key="content"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0 }}
                            transition={{ duration: 0.2, ease: "easeOut" }}
                        >
                            <h1 className="text-[32px] max-[500px]:text-[24px] font-bold leading-[35px]">
                                {currentNews?.title}
                            </h1>
                            <hr className="my-[15px]" />
                            <div className="flex flex-wrap max-[1061px]:justify-center max-[1061px]:gap-[77px] justify-between">
                                <div>
                                    <p className="text-[#444444] mb-[10px] max-[500px]:text-[14px]">
                                        {formatDate(currentNews?.createdAt)}
                                    </p>

                                    {/* Анимация изображения без масштаба */}
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        transition={{ duration: 0.2, ease: "easeOut", delay: 0.1 }}
                                        className="relative h-[388px] max-[500px]:w-[100%] w-[813px] max-[812px]:w-[569px] max-[812px]:h-[272px] overflow-hidden rounded-[8px]"
                                    >
                                        {currentNews?.imageURL && (
                                            <Image
                                                src={currentNews.imageURL}
                                                alt="Новостное изображение"
                                                fill
                                                quality={100}
                                                priority
                                                className="object-cover w-full h-full"
                                            />
                                        )}
                                    </motion.div>

                                    {/* Анимация текста без масштаба */}
                                    <motion.div
                                        initial={{ opacity: 0, y: 5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.2, ease: "easeOut", delay: 0.15 }}
                                        className="flex flex-row gap-[30px] mt-[24px] justify-start"
                                    >
                                        <div
                                            dangerouslySetInnerHTML={{ __html: currentNews?.content || "" }}
                                            className="max-w-[800px] prose break-words"
                                        />
                                    </motion.div>
                                </div>

                                {/* Анимация боковой панели без масштаба */}
                                <motion.div
                                    initial={{ opacity: 0, x: 10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ duration: 0.2, ease: "easeOut", delay: 0.2 }}
                                >
                                    <NewsSideBar _id={currentNews?.id} />
                                </motion.div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Container>
    );
};
