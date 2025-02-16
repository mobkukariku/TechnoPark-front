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

    const truncateText = (text: string, maxLength: number) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        }
        return text;
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
                        <p className={"font-bold hover:text-[#5998FF] w-[550px] max-[500px]:w-[320px] leading-[25px] transition-colors text-[20px]"}>{title}</p>
                    </Link>
                    <span className={"text-[#8B8B8B] mt-[10px] text-[14px]"}>{formatDate(createdAt)}</span>
                    <span className="mt-[10px] block w-[400px] max-[500px]:w-[330px] leading-[20px] overflow-hidden text-ellipsis line-clamp-2">
          {truncateText(content, 80)}
        </span>


                </div>
            </div>
    )
}