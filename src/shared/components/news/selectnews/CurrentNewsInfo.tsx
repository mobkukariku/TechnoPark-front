"use client"
import {FC, useEffect} from "react";
import {Container} from "@/shared/components";
import {NewsSideBar, NewsIcons} from "@/shared/components/news/selectnews";

import Image from "next/image";
import useNewsStore from "@/store/useNewsStore";
import {CurrentNewsSkeleton} from "@/shared/components/news/selectnews/CurrentNewsSkeleton";

export const CurrentNewsInfo: FC<{newsId: string | Array<string> | undefined}> = ({newsId}) => {

    const { currentNews, setCurrentPage, isLoading, } = useNewsStore();

    useEffect(() => {
        setCurrentPage(newsId);
    }, []);

    const formatDate = (date?: string) => {
        if (!date) return;
        return new Date(date).toLocaleDateString("ru-RU");
    };


    return (
        <Container>
            <div>
                {!isLoading  ? (
                    <>
                        <h1 className={"text-[32px] font-bold leading-[35px]"}>{currentNews?.title}</h1>
                        <hr className={"my-[15px]"}/>
                        <div className={"flex flex-wrap  max-[1061px]:justify-center max-[1061px]:gap-[77px]  justify-between"}>
                            <div className={""}>
                                <p className={"text-[#444444] mb-[10px] "}>{formatDate(currentNews?.createdAt)}</p>
                                <div className="relative h-[388px]  w-[813px] max-[812px]:w-[569px] max-[812px]:h-[272px] overflow-hidden rounded-[8px]">
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
                                </div>

                                <div className={"flex flex-row gap-[30px] mt-[24px] justify-start "}>
                                    <div
                                        dangerouslySetInnerHTML={{ __html: currentNews?.content || "" }}
                                        className="max-w-[800px] prose break-words"
                                    />
                                </div>
                            </div>
                            <NewsSideBar _id={currentNews?.id}/>
                        </div>
                    </>
                ) : (
                    <CurrentNewsSkeleton  />
                )}
            </div>
        </Container>
    )
}