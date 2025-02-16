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

    const truncateText = (text: string, maxLength: number) => {
        if (text.length > maxLength) {
            return text.substring(0, maxLength) + "...";
        }
        return text;
    };

    return (
        <div className={"bg-white relative p-[12px] h-[350px] w-[343px] rounded-[10px]"}>
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
                  <h3 className={"font-bold text-[20px]"}>{truncateText(title, 60)}</h3>
                  <Link href={`news/${_id}`} className={"bottom-2 absolute right-2" }>
                      <div className={""}>
                          <p className={"text-end flex gap-[5px] hover:text-[#2D7DFF] transition-colors  justify-center items-center font-semibold"}>Подробнее <ArrowRight width={17} /></p>
                      </div>
                  </Link>
        </div>
    );
};
