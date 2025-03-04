"use client";
import { FC } from "react";
import { Container, ShortNewsCarousel } from "@/shared/components";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";

export const ShortNews: FC = () => {
    const t = useTranslations("ShortNews");

    return (
        <div className="relative">
            <div className="bg-[#D8E7FF] relative z-50">
                <div className="py-[48px]">
                    <Container className="relative z-50">
                        <p className="text-[32px] max-[500px]:text-[24px] max-[500px]:text-center font-bold">
                            {t("title")}
                        </p>
                        <ShortNewsCarousel />
                        <Link
                            href="/news"
                            className="text-center font-semibold text-[#2D7DFF] underline-offset-4 underline"
                        >
                            <p className="max-[500px]:text-[14px]">{t("showMore")}</p>
                        </Link>
                    </Container>
                </div>
            </div>
            <div className="max-w-[1700px] mx-auto">
                <Image
                    src="/landing/element.svg"
                    width={846}
                    quality={20}
                    height={819}
                    alt="element"
                    className="top-[-600px] absolute z-0"
                />
            </div>
        </div>
    );
};
