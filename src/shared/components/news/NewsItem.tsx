import { FC } from "react";
import Image from "next/image";
import {ArrowRight} from "lucide-react";
import Link from "next/link";

export const NewsItem: FC<{
    _id: string;
    imageURL: string;
    title: string;
    createdAt: string;
}> = ({ imageURL, title, createdAt, _id}) => {

    const formatDate = (date: string | Date) => {
        const d = new Date(date);
        return d.toLocaleDateString("ru-RU");
    };

    return (
        <div className={"bg-white p-[12px]  w-[343px] rounded-[10px]"}>
            <div className="relative h-[165px] overflow-hidden rounded-[8px]">
                <Link href={`news/${_id}`}>
                    <Image
                        src={imageURL}
                        alt={title}
                        layout="fill"
                        objectFit="cover"
                    />
                </Link>
            </div>
            <span className={"text-[#8B8B8B]"}>{formatDate(createdAt)}</span>
            <h3 className={"font-bold text-[20px]"}>{title}</h3>
            <Link href={`news/${_id}`}>
                <div className={"flex items-center justify-end"}>
                        <p className={"text-end font-medium"}>Подробнее</p>
                        <ArrowRight />
                </div>
            </Link>
        </div>
    );
};
