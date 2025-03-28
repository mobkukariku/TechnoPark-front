"use client";
import { FC } from "react";
import { Container } from "@/shared/components/";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useHasBeenInView } from "@/hooks/useHasBeenInView";

export const HardwareInfo: FC = () => {
    const t = useTranslations("hardware");
    const { ref, hasBeenInView } = useHasBeenInView();

    return (
        <Container className="mt-[50px]">
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={hasBeenInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex justify-around flex-wrap"
            >
                {/* Анимация для изображения */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={hasBeenInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                    <Image src={"/hardware/info-flat.svg"} alt={"info"} width={424} height={424} />
                </motion.div>

                {/* Анимация для текста */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={hasBeenInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                    className="flex flex-col mt-[50px] max-[1000px]:mb-[100px] max-[500px]:w-fit"
                >
                    <p className="text-[32px] max-[500px]:text-[24px] font-[600]">
                        {t("why")}{" "}
                        <span className="uppercase text-white font-[700] bg-[#2D7DFF] px-2 rounded-[8px]">
                            Hardware
                        </span>{" "}
                        {t("direction")}?
                    </p>

                    {/* Анимация для списка */}
                    <motion.ul
                        initial={{ opacity: 0, y: 20 }}
                        animate={hasBeenInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                        className="space-y-[20px] max-[500px]:space-y-[10px] max-[500px]:mx-[10px] text-[20px] max-[500px]:text-[16px] max-w-[500px] w-full mt-[28px] list-disc list-inside"
                    >
                        <li>{t("points.point1")}</li>
                        <li>{t("points.point2")}</li>
                        <li>{t("points.point3")}</li>
                    </motion.ul>
                </motion.div>
            </motion.div>
        </Container>
    );
};
