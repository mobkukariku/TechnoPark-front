import {FC} from "react";
import Image from "next/image";

export const NewsIcons:FC = () => {
    return (
        <div className={"flex flex-col gap-[20px]"}>
            <Image src={"/contacts/insta.svg"} width={40} height={40} alt={"icon"}  className={"cursor-pointer"} />
            <Image src={"/contacts/linkedin.svg"} width={40} height={40} alt={"icon"}  className={"cursor-pointer"}  />
            <Image src={"/contacts/telegram.svg"} width={40} height={40} alt={"icon"}   className={"cursor-pointer"} />
        </div>
    )
}