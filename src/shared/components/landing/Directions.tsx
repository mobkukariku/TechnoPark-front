import { FC } from "react";
import { Container, DirectionCard } from "../";

export const Directions: FC = () => {
    return (
        <Container className={"relative z-50"}>
            <div className={"flex flex-col justify-center  relative z-50 items-center mt-[110px]"}>
                <p className={"text-[32px] font-[700]"}>Чем мы занимаемся?</p>
                <span className={"w-[600px] mt-[10px] text-center leading-[23px]"}>
                    Вы можете узнать о деятельности Технопарка и наших проектах перейдя по страницам ниже. Также вы можете узнать больше о нас в разделе "Новости"
                </span>
            </div>
            <div className={"mt-[61px] flex gap-[57px] relative z-50 justify-center mb-[113px]"}>
                <DirectionCard
                    directionImage={"landing/hardware.svg"}
                    image={"https://www.figma.com/file/6gbT120loIYOOu4SHCmIli/image/2c77b164a259775e39ad5975d431db95eb332cfc"}
                    title={"Hardware"}
                    description={"Создание и производство физических устройств и компонентов, включая IoT и умные устройства"}
                    link={"/hardware"}
                />
                <DirectionCard
                    directionImage={"landing/software.svg"}
                    image={"https://www.figma.com/file/6gbT120loIYOOu4SHCmIli/image/2c77b164a259775e39ad5975d431db95eb332cfc"}
                    title={"Software"}
                    description={"Разработка программного обеспечения для различных систем"}
                    link={"/software"}
                />
            </div>
        </Container>
    );
};
