import { FC } from "react";
import { Button } from "@/shared/ui";
import { Container } from "@/shared/components";

export const CampusToor: FC = () => {
    return (
        <Container>
            <div className="flex max-w-[600px] w-full my-12 mx-auto gap-5 flex-col justify-center items-center px-4 text-center">
                <p className="font-bold text-2xl sm:text-3xl">Запланируйте визит</p>
                <span className="text-lg sm:text-xl">
                    Хотите узнать больше о нашем технопарке? Запишитесь на экскурсию и познакомьтесь с нашими
                    лабораториями, разработками и резидентами!
                </span>
                <Button className="w-full sm:w-fit">Оставить заявку</Button>
            </div>
        </Container>
    );
};
