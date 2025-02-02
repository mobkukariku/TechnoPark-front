import {FC} from "react";
import {Container, ContactsDetails} from "@/shared/components";

export const ContactsMainInfo:FC = () => {

    return (
        <Container className={"relative"}>
            <div className={"text-center  relative z-50 mt-[20px]"}>
                <p className={"text-[32px] font-bold py-[20px]"}>Контакты</p>
                <span className={"text-[20px] font-medium mb-[30px]"}>Мы всегда рады новым идеям, сотрудничеству и вопросам! Если вам нужно больше информации или вы хотите обсудить проект, не стесняйтесь связаться с нами.</span>
            </div>
            <ContactsDetails/>
            <div className={"absolute z-0 rounded-full left-[120px] blur-[100px] top-[10px] w-[208px] h-[208px] bg-[#89B6FF5C]"}/>
            <div className={"absolute z-0 rounded-full right-[100px] blur-[100px] top-[300px] w-[428px] h-[428px] bg-[#4E48FE5C]"}/>
        </Container>
    )
}