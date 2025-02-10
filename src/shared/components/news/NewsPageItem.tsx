import {FC} from "react";
import Image from "next/image";
interface NewsPageItemProps {
    title: string;
    content: string;
    imageURL: string;
    createdAt: string;
}

export const NewsPageItem: FC<NewsPageItemProps> = ({
    title,
    content,
    imageURL,
    createdAt,
}) => {





    const formatDate = (date: string | Date) => {
        const d = new Date(date);
        return d.toLocaleDateString("ru-RU");
    };



    return (

            <div className={"flex max-[500px]:flex-col gap-[15px] max-[500px]:gap-[0px] relative z-50"}>
                <div className="relative w-[319px] h-[165px] overflow-hidden rounded-[8px]">
                    <Image
                        src={imageURL}
                        alt={title}
                        layout="fill"
                        objectFit="cover"
                    />
                </div>
                <div className={"flex flex-col mt-[10px]"}>
                    <p className={"font-bold text-[20px]"}>{title}</p>
                    <span className={"text-[#8B8B8B] text-[14px]"}>{formatDate(createdAt)}</span>
                    <span className={"mt-[15px]"}>{content}</span>
                </div>
            </div>
    )
}