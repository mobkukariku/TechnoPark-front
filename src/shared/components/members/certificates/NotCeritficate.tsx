import {FC} from "react";
import Image from "next/image";
export const NotCeritficate:FC = () => {
    return (
        <div className={"flex flex-col justify-center items-center gap-[10px] mt-[70px]"}>
            <Image src={"/members/certificates/notFound.svg"} width={55} height={55} alt={"not certificates"} />
            <p className={"font-medium text-[#8B8B8B]"}>Нету сертификатов соре :(</p>
        </div>
    )
}