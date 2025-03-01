import { FC } from "react";
import { Container, DirectionCard } from "../";
import { useTranslations } from "next-intl";

export const Directions: FC = () => {
    const t = useTranslations("Directions");

    return (
        <Container className="relative z-50">
            <div className="flex flex-col justify-center relative z-50 items-center mt-[110px]">
                <p className="text-[32px] font-[700] max-[1000px]:text-[24px]">{t("title")}</p>
                <span className="w-[600px] max-[1000px]:text-[16px] max-[500px]:w-fit mt-[10px] text-center leading-[23px]">
                    {t("description")}
                </span>
            </div>
            <div className="mt-[61px] flex flex-wrap gap-[57px] max-[1000px]:gap-[20px] relative z-50 justify-center mb-[113px]">
                <DirectionCard
                    directionImage="/landing/hardware.svg"
                    image="https://www.figma.com/file/6gbT120loIYOOu4SHCmIli/image/2c77b164a259775e39ad5975d431db95eb332cfc"
                    title={t("hardware.title")}
                    description={t("hardware.description")}
                    link="/hardware"
                />
                <DirectionCard
                    directionImage="/landing/software.svg"
                    image="https://www.figma.com/file/6gbT120loIYOOu4SHCmIli/image/2c77b164a259775e39ad5975d431db95eb332cfc"
                    title={t("software.title")}
                    description={t("software.description")}
                    link="/software"
                />
            </div>
        </Container>
    );
};
