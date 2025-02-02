import {FC} from "react";
import Image from "next/image";
import {Container} from "@/shared/components";
import {Button} from "@/shared/ui";
import {HeaderMenu} from "@/shared/components/header/HeaderMenu";
import Link from "next/link";

export const Header:FC = () => {

    return (
       <Container className={"mb-[67px] relative z-50   p-0"}>
           <header className={"mt-[20px] w-full relative z-50 flex justify-between items-center"}>
               <div className={"flex items-center gap-[39px] relative z-20 "}>
                   <Link href={"/"}>
                       <Image width={105} height={44} src={"logo.svg"} alt={"as"} />
                   </Link>
                   <HeaderMenu />
               </div>
               <Link href={"/joinus"} className={"relative z-50 "}>
                   <Button size={"default"} variant={"default"} className="text-[18px]">Присоединиться</Button>
               </Link>
           </header>
       </Container>
    )
}