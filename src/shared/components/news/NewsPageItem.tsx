import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion } from "framer-motion";

interface NewsPageItemProps {
    id: string;
    title: string;
    content: string;
    imageURL: string | null;
    createdAt: string;
    index: number; // Передаем индекс для задержки
}

export const NewsPageItem: FC<NewsPageItemProps> = ({
                                                        id,
                                                        title,
                                                        content,
                                                        imageURL,
                                                        createdAt,
                                                        index,
                                                    }) => {
    const formatDate = (date: string | Date) => {
        const d = new Date(date);
        return d.toLocaleDateString("ru-RU");
    };

    return (
        <motion.div
            initial={{ opacity: 0, filter: "blur(3px)", y: 10 }}
            animate={{ opacity: 1, filter: "blur(0px)", y: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut", delay: index * 0.1 }} // Индивидуальная задержка
            className="flex max-[500px]:flex-col gap-[15px] max-[500px]:gap-[0px] relative z-50"
        >
            <div className="relative w-[319px] h-[165px] overflow-hidden rounded-[8px]">
                <Link href={`/news/${id}`}>
                    {imageURL ? (
                        <Image
                            src={imageURL}
                            alt={title}
                            quality={20}
                            layout="fill"
                            objectFit="cover"
                        />
                    ) : null}
                </Link>
            </div>
            <div className="flex flex-col mt-[10px]">
                <Link href={`/news/${id}`}>
                    <p className="font-bold hover:text-[#5998FF] w-[550px] max-[500px]:w-[320px] leading-[25px] transition-colors text-[20px]">
                        {title}
                    </p>
                </Link>
                <span className="text-[#8B8B8B] mt-[10px] text-[14px]">
                    {formatDate(createdAt)}
                </span>
                <div
                    className="mt-[10px] w-[400px] max-[500px]:w-[330px] leading-[20px] overflow-hidden text-ellipsis line-clamp-2"
                    dangerouslySetInnerHTML={{ __html: content || "" }}
                />
            </div>
        </motion.div>
    );
};
