import { FC } from "react";
import Image from "next/image";
import { Button } from "@/shared/ui";

export const AdminNewsItem: FC<{
    id: string;
    imageURL: string;
    title: string;
    createdAt: string;
    onDelete: (id: string) => void;
}> = ({ id, imageURL, title, createdAt, onDelete }) => {

    const formatDate = (date: string | Date) => {
        const d = new Date(date);
        return d.toLocaleDateString("ru-RU");
    };

    return (
        <div className={"bg-white h-fit p-[12px] w-[343px] rounded-[10px]"}>
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
            <div className={"flex items-center mt-[10px] justify-between"}>
                <Button className={"text-[12px] rounded-[5px]"}>Изменить</Button>
                <Button
                    variant={"secondary"}
                    className={"text-[12px] rounded-[5px]"}
                    onClick={() => onDelete(id)}
                >
                    Удалить
                </Button>
            </div>
        </div>
    );
};
