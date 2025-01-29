import {FC} from "react";
import {Container} from "@/shared/components/"
import Image from "next/image";
export const SoftwareInfo:FC = () => {
    return (
        <Container className={"mt-[50px]"}>
            <div className={"flex justify-around"}>
                <Image src={"software/info-flat.svg"} alt={"info"} width={507} height={399} />
                <div className={"flex flex-col mt-[50px]"}>
                    <p className={"text-[32px] font-[600]"}>
                        Почему{" "}
                        <span className={"uppercase text-white font-[700] bg-[#2D7DFF] px-2 rounded-[8px]"}>Software</span> направление?
                    </p>
                    <ul className={"space-y-[20px] text-[20px] w-[500px] mt-[28px] list-disc list-inside"}>
                        <li>
                            Инновационные технологии: мы работаем с самыми современными инструментами разработки.
                        </li>
                        <li>
                            Международный подход: курсы и программы соответствуют мировым стандартам.
                        </li>
                        <li>
                            Практический фокус: студенты и участники получают реальный опыт работы над проектами.
                        </li>
                    </ul>
                </div>

            </div>
        </Container>
    )
}