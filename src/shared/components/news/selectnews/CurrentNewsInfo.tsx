"use client"
import {FC, useEffect} from "react";
import {Container} from "@/shared/components";
import {NewsSideBar, NewsIcons} from "@/shared/components/news/selectnews";

import Image from "next/image";
import useNewsStore from "@/store/useNewsStore";

export const CurrentNewsInfo: FC<{newsId: string | Array<string> | undefined}> = ({newsId}) => {

    const { currentNews, setCurrentPage, isLoading, } = useNewsStore();

    useEffect(() => {
        if(!isLoading){
            setCurrentPage(newsId);
        }
    }, []);

    const formatDate = (date?: string) => {
        if (!date) return "Неизвестная дата";
        return new Date(date).toLocaleDateString("ru-RU");
    };

    if(isLoading){
        return(
            <>Загрузка</>
        )
    }

    return (
        <Container>
            <div>
                <h1 className={"text-[32px] font-bold leading-[35px]"}>{currentNews?.title}</h1>
                <hr className={"my-[15px]"}/>
              <div className={"flex  justify-between"}>
                  <div className={""}>
                      <p className={"text-[#444444] mb-[10px] "}>{formatDate(currentNews?.createdAt)}</p>
                      <div className="relative h-[288px] w-[813px] overflow-hidden rounded-[8px]">
                          {currentNews?.imageURL && (
                              <Image src={currentNews.imageURL} width={813} height={288} alt="pic" />
                          )}
                      </div>
                      <div className={"flex flex-row gap-[30px] mt-[24px] justify-start "}>
                          <NewsIcons/>
                          <div className="">
                              <p className={"max-w-[700px]  "}>
                                  {currentNews?.content}
                              </p>
                          </div>
                      </div>
                  </div>
                  <NewsSideBar/>
              </div>
            </div>
        </Container>
    )
}