"use client"
import {FC, useEffect} from "react";
import useProjectsStore from "@/store/useProjectsStore";
import Image from "next/image";
import {Button} from "@/shared/ui";

export const AdminProjectsList:FC = () => {

    const {projects, fetchProjectsData, isLoading } = useProjectsStore();

    useEffect(() => {
        if(!isLoading){
            fetchProjectsData();
        }
    }, [fetchProjectsData]);

    return (
        <div className={"mr-[20px] rounded-[22px] p-[20px] flex flex-col gap-[10px]"}>
            {projects.map((item,) => (
                <div key={item.id} className="flex items-center justify-between border-2 p-3 rounded-[14px] gap-4">
                    {/* Изображение новости */}
                    <div className="relative h-[92px] w-[178px] overflow-hidden rounded-[8px]">
                        <Image
                            src={item.images[0].imageUrl}
                            alt={item.title}
                            layout="fill"
                            objectFit="cover"
                        />
                    </div>

                    {/* Дата и заголовок */}
                    <div className="flex-1  min-w-0">
                        <h3 className="font-bold text-[18px] text-ellipsis overflow-hidden whitespace-nowrap">{item.title}</h3>
                    </div>

                    {/* Кнопки */}
                    <div className="flex flex-col gap-2">
                        <Button className="text-[12px] rounded-[5px]">Изменить</Button>
                        <Button
                            variant="secondary"
                            className="text-[12px] rounded-[5px]"
                        >
                            Удалить
                        </Button>
                    </div>
                </div>
            ))}
        </div>
    )
}