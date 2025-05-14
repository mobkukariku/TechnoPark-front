"use client";

import { FC, useEffect } from "react";
import useNewsStore from "@/store/useNewsStore";
import Link from "next/link";

export const NewsSideBar: FC<{ _id?: string | Array<string> }> = ({ _id }) => {
  const { lastNews, setLastNews } = useNewsStore();

  const formatDate = (date?: string) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("ru-RU");
  };

  useEffect(() => {
    const currentId = Array.isArray(_id) ? _id[0] : _id;
    if (currentId !== undefined) {
      setLastNews(currentId);
    }
  }, [_id, setLastNews]);

  return (
    <div className="w-[250px] max-[1061px]:w-full">
      <p className="text-center font-semibold text-[20px] mt-[10px]">
        Последние новости
      </p>
      <div className="w-full max-[1061px]:mb-[30px] mt-[21px] flex flex-col gap-[20px] px-2 sm:px-0">
        {lastNews.length > 0 ? (
          lastNews.map((item) => (
            <div key={item.id} className="flex flex-col gap-[6px]">
              <Link href={`/news/${item.id}`} legacyBehavior>
                <a className="font-medium hover:text-[#5998FF] transition-colors break-words">
                  {item.title}
                </a>
              </Link>
              <p className="text-[#444444] text-[14px]">
                {formatDate(item.createdAt)}
              </p>
              <hr className="border-[#CDCDCD]" />
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Нет последних новостей.</p>
        )}
      </div>
    </div>
  );
};
