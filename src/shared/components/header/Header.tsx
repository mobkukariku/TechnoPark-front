import {FC} from "react";
import Image from "next/image";
import {Container} from "@/shared/components";
import {Button} from "@/shared/ui";
import {HeaderMenu} from "@/shared/components/header/HeaderMenu";
import Link from "next/link";

export const Header:FC = () => {

    return (
       <Container className={"mb-[67px]"}>
           <header className={"mt-[20px] flex justify-between"}>
               <div className={"flex items-center gap-[39px]"}>
                   <Link href={"/"}>
                       <Image width={105} height={44} src={"logo.svg"} alt={"as"} />
                   </Link>
                   <HeaderMenu />
               </div>
               <Button size={"default"} variant={"default"} className="text-[18px]">Присоединиться</Button>
           </header>
       </Container>
    )
}