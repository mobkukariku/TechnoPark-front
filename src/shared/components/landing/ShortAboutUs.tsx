import {FC} from "react";
import {Button} from "@/shared/ui";
import {Container} from "@/shared/components";
import Link from "next/link";

export const ShortAboutUs:FC = () => {
    return (
       <Container>
           <div className={"max-w-[973px] mx-auto mt-[100px] flex flex-col gap-5"}>
               <div>
                   <p className={"text-[32px] font-bold max-[500px]:text-[24px]"}>О нас</p>
                   <hr className={"w-[200px] border-2 border-[#2D7DFF]"}/>
               </div>
               <span className={"text-[20px] font-[500] leading-[29px] max-[500px]:text-[16px] max-[500px]:leading-[25px]"}>SDU Technopark — это инновационный хаб, объединяющий стартапы, ученых и предпринимателей для создания передовых технологических решений. Мы предоставляем современную инфраструктуру, ресурсы и поддержку для разработки и внедрения инновационных проектов в области программного обеспечения и аппаратных технологий...</span>
               <div className={"flex justify-end"}>
                   <Link href={"/aboutUs"}>
                       <Button  className={"text-[18px]"} variant={"outline"}>Подробнее</Button>
                   </Link>
               </div>
           </div>
       </Container>
    )
}