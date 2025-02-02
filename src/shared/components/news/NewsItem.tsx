import { FC } from "react";
import Image from "next/image";
import {ArrowRight} from "lucide-react";

export const NewsItem: FC<{
    imageURL: string;
    title: string;
    createdAt: string;
}> = ({ imageURL, title, createdAt }) => {

    const formatDate = (date: string | Date) => {
        const d = new Date(date);
        return d.toLocaleDateString("ru-RU");
    };

    return (
        <div className={"bg-white p-[12px]  w-[343px] rounded-[10px]"}>
            <div className="relative h-[165px] overflow-hidden rounded-[8px]">
                <Image
                    src={imageURL}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                />
            </div>
            <span className={"text-[#8B8B8B]"}>{formatDate(createdAt)}</span>
            <h3 className={"font-bold text-[20px]"}>{title}</h3>
            <div className={"flex items-center justify-end"}>
                <p className={"text-end font-medium"}>Подробнее</p>
                <ArrowRight />
            </div>
        </div>
    );
};
