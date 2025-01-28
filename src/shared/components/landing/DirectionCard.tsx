import {FC} from "react";
import Image from "next/image";
import {Button} from "@/shared/ui";
import Link from "next/link";

export interface DirectionCardProps {
    image: string;
    title: string;
    description: string;
    link: string;
    directionImage: string;
}

export const DirectionCard:FC<DirectionCardProps> = ({
    image,
    title,
    description,
    link,
    directionImage,
}) => {
    return (
        <div className={"flex relative overflow-hidden z-20 flex-col px-[31px] pt-[35px] pb-[50px]  w-[426px] bg-[#D8E7FF] rounded-[22px] border-2 border-[#2D7DFF] justify-center items-center"}>
            <Image src={image} alt={title} width={363} height={168} className={"object-cover w-[363px] h-[168px] rounded-[8px]"} />
           <div className={"mt-[38px] flex flex-col z-20 text-center"}>
               <p className={"uppercase font-[700] text-[24px] mb-[8px]"}>{title}</p>
               <span>{description}</span>
               <Link href={link} className={"mt-[24px]"}>
                   <Button className={"w-[60%]"}>Подробнее</Button>
               </Link>
           </div>
            <Image className={"absolute z-0 right-0 bottom-0"} width={224} height={224}  src={directionImage} alt={title} />
        </div>
    )
}