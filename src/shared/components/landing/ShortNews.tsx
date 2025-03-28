"use client";
import { FC } from "react";
import { Container, ShortNewsCarousel } from "@/shared/components";
import Link from "next/link";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useHasBeenInView } from "@/hooks/useHasBeenInView";
import { useTypewriterEffect } from "@/hooks/useTypewriterEffect";

export const ShortNews: FC = () => {
    const t = useTranslations("ShortNews");
    const { ref, hasBeenInView } = useHasBeenInView(0.2);
    const title = useTypewriterEffect(t("title"), 100); // Скорость 100 мс на букву

    return (
        <div ref={ref} className="relative my-[200px] ">
            <div className="bg-[#D8E7FF] relative z-50">
                <div className="py-[48px]">
                    <Container className="relative z-50">
                        <p
                            className="text-[32px] max-[500px]:text-[24px] max-[500px]:text-center font-bold"
                        >
                            {title}
                        </p>

                        <ShortNewsCarousel />

                        <motion.div
                            initial={{ opacity: 0, y: 10 }}
                            animate={hasBeenInView ? { opacity: 1, y: [10, -5, 0] } : {}}
                            transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
                        >
                            <Link
                                href="/news"
                                className="text-center font-semibold text-[#2D7DFF] underline-offset-4 underline"
                            >
                                <p className="max-[500px]:text-[14px]">{t("showMore")}</p>
                            </Link>
                        </motion.div>
                    </Container>
                </div>
            </div>

            <motion.div
                initial={{ opacity: 0, y: -100 }}
                animate={hasBeenInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 1.2, delay: 0.4, ease: "easeOut" }}
                className="max-w-[1700px] mx-auto"
            >
                <Image
                    src="/landing/element.svg"
                    width={846}
                    quality={20}
                    height={819}
                    alt="element"
                    className="top-[-600px] absolute z-0"
                />
            </motion.div>
        </div>
    );
};
