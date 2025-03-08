import {FC} from "react";
import Image from "next/image";


export const HasNotExperience:FC = () => {
    return (
        <div className={"flex flex-col justify-center items-center gap-[10px] mt-[70px]"}>
            <Image src={"/members/experience/notFound.svg"} width={55} height={55} alt={"nothing"} />
            <p className={"font-medium text-[#8B8B8B]"}>Нету данных о работе :(</p>
        </div>
    )
}