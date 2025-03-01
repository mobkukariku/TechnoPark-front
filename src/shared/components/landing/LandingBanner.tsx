"use client";
import { FC } from "react";
import Image from "next/image";
import { Container } from "@/shared/components";
import { useTranslations } from "next-intl";

export const LandingBanner: FC = () => {
    const t = useTranslations("LandingBanner");

    return (
        <Container>
            <div className="relative flex max-[1000px]:flex-col items-center gap-[32px] justify-center">
                <div className="w-[507px] max-[1000px]:w-fit relative z-20 flex flex-col gap-[10px]">
                    <p className="text-[48px] max-[1000px]:text-center max-[500px]:text-[30px] font-[800] leading-[58px] max-[500px]:leading-[35px]">
                        {t("title")} <br />
                        <span className="bg-[#2D7DFF] px-[15px] rounded-2xl text-white">
                            SDU TECHNOPARK
                        </span>
                    </p>
                    <span className="font-[500] text-[#686868] max-[1000px]:text-center max-[500px]:text-[14px] leading-[19px]">
                        {t("description")}
                    </span>
                </div>
                <div className="relative z-20">
                    <Image
                        alt={t("imageAlt")}
                        width={459}
                        height={459}
                        src="/landing/landingBanner.svg"
                    />
                </div>
                <div className="absolute z-0 max-[500px]:w-[208px] blur-[50px] max-[500px]:h-[208px] max-[500px]:left-[150px] rounded-full left-[220px] top-[0px] w-[388px] h-[388px] bg-[#89B6FF5C]" />
                <div className="absolute z-0 rounded-full max-[500px]:right-[120px] blur-[50px] right-[200px] max-[500px]:w-[208px] max-[500px]:h-[208px] top-[100px] w-[428px] h-[428px] bg-[#4E48FE5C]" />
            </div>
        </Container>
    );
};
