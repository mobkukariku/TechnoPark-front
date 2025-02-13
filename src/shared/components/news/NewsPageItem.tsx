import {FC} from "react";
import Image from "next/image";
import Link from "next/link";
interface NewsPageItemProps {
    _id: string;
    title: string;
    content: string;
    imageURL: string;
    createdAt: string;
}

export const NewsPageItem: FC<NewsPageItemProps> = ({
    _id,
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
                   <Link href={`/news/${_id}`}>
                       <Image
                           src={imageURL}
                           alt={title}
                           layout="fill"
                           objectFit="cover"
                       />
                   </Link>
                </div>
                <div className={"flex flex-col mt-[10px]"}>
                    <Link href={`/news/${_id}`}>
                        <p className={"font-bold hover:text-[#5998FF] transition-colors text-[20px]"}>{title}</p>
                    </Link>
                    <span className={"text-[#8B8B8B] text-[14px]"}>{formatDate(createdAt)}</span>
                    <span className={"mt-[15px]"}>{content}</span>
                </div>
            </div>
    )
}