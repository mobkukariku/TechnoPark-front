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
        <div className="flex items-center justify-between border-2 p-3 rounded-[14px] gap-4">
            {/* Изображение новости */}
            <div className="relative h-[92px] w-[178px] overflow-hidden rounded-[8px]">
                <Image
                    src={imageURL}
                    alt={title}
                    layout="fill"
                    objectFit="cover"
                />
            </div>

            {/* Дата и заголовок */}
            <div className="flex-1  min-w-0">
                <span className="block text-[#8B8B8B] text-sm">{formatDate(createdAt)}</span>
                <h3 className="font-bold text-[18px] text-ellipsis overflow-hidden whitespace-nowrap">{title}</h3>
            </div>

            {/* Кнопки */}
            <div className="flex flex-col gap-2">
                <Button className="text-[12px] rounded-[5px]">Изменить</Button>
                <Button
                    variant="secondary"
                    className="text-[12px] rounded-[5px]"
                    onClick={() => onDelete(id)}
                >
                    Удалить
                </Button>
            </div>
        </div>
    );
};
