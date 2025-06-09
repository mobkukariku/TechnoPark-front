"use client";
import { FC, useEffect } from "react"; // Import useState
import { Container } from "@/shared/components";
import { NewsSideBar } from "@/shared/components/news/selectnews";
import Image from "next/image";
import useNewsStore from "@/store/useNewsStore";
import { CurrentNewsSkeleton } from "@/shared/components/news/selectnews/CurrentNewsSkeleton";
import { motion, AnimatePresence } from "framer-motion";

export const CurrentNewsInfo: FC<{
  newsId: string | Array<string> | undefined;
}> = ({ newsId }) => {
  const { currentNews, setCurrentNews, isLoading } = useNewsStore();
  useEffect(() => {
    setCurrentNews(newsId as string | undefined);
  }, [newsId, setCurrentNews]);

  const formatDate = (date?: string) => {
    if (!date) return "";
    return new Date(date).toLocaleDateString("ru-RU");
  };

  const imageSrc = currentNews?.imageURL;

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
          ) : currentNews ? (
            <motion.div
              key="content"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2, ease: "easeOut" }}
            >
              <h1 className="text-[32px] max-[500px]:text-[24px] font-bold leading-[35px] break-words">
                {currentNews.title}
              </h1>
              <hr className="my-[15px]" />
              <div className="flex flex-row max-[812px]:flex-col max-[1061px]:justify-center max-[1061px]:gap-[50px] gap-6 justify-between">
                <div className="flex-grow min-w-0">
                  <p className="text-[#444444] mb-[10px] max-[500px]:text-[14px]">
                    {formatDate(currentNews.createdAt)}
                  </p>

                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 0.2, ease: "easeOut", delay: 0.1 }}
                    className="relative w-full max-w-[813px]
                                      aspect-video
                                      overflow-hidden rounded-[8px]"
                  >
                    {imageSrc && (
                        <Image
                            src={imageSrc} // Use placeholder on error
                            alt={currentNews.title || "Новостное изображение"}
                            fill
                            quality={100}
                            priority
                            className="object-cover w-full h-full"
                            sizes="(max-width: 500px) 100vw, (max-width: 812px) 569px, 813px"
                        />
                    )}
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, y: 5 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{
                      duration: 0.2,
                      ease: "easeOut",
                      delay: 0.15,
                    }}
                    className="mt-[24px]"
                  >
                    <div
                      dangerouslySetInnerHTML={{
                        __html: currentNews.content || "",
                      }}
                      className="max-w-[800px] prose lg:prose-lg break-words"
                    />
                  </motion.div>
                </div>

                <motion.div
                  initial={{ opacity: 0, x: 10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{
                    duration: 0.2,
                    ease: "easeOut",
                    delay: 0.2,
                  }}
                  className="flex-shrink-0"
                >
                  <NewsSideBar _id={currentNews.id} />
                </motion.div>
              </div>
            </motion.div>
          ) : (
            <motion.div
              key="not-found"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              className="text-center py-10"
            >
              <p>Новость не найдена.</p>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </Container>
  );
};
