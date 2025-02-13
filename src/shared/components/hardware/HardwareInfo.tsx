import {FC} from "react";
import {Container} from "@/shared/components/"
import Image from "next/image";
export const HardwareInfo:FC = () => {
    return (
        <Container className={"mt-[50px]"}>
           <div className={"flex justify-around flex-wrap"}>
               <Image src={"hardware/info-flat.svg"} alt={"info"} width={424} height={424} />
               <div className={"flex flex-col mt-[50px] max-[1000px]:mb-[100px] max-[500px]:w-fit"}>
                   <p className={"text-[32px] text-center max-[500px]:text-[24px] font-[600]"}>
                    Почему <span className={"uppercase text-white font-[700] bg-[#2D7DFF] px-2 rounded-[8px]"}>Hardware</span> направление?
                   </p>
                   <ul className={"space-y-[20px] max-[500px]:space-y-[10px] max-[500px]:mx-[10px]  text-[20px] max-[500px]:text-[16px] max-w-[500px] w-full mt-[28px] list-disc list-inside"}>
                       <li>
                           Разработка умных устройств и IoT-решений.
                       </li>
                       <li>
                           Проведение исследований в области робототехники и микроэлектроники.
                       </li>
                       <li>
                           Создание прототипов и внедрение технологий в реальный сектор.
                       </li>
                   </ul>
               </div>

           </div>
        </Container>
    )
}