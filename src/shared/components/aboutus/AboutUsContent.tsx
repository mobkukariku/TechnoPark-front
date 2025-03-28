"use client";
import { FC } from "react";
import { Container } from "@/shared/components";
import { OurMissions } from "@/shared/components/aboutus";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useHasBeenInView } from "@/hooks/useHasBeenInView";

export const AboutUsContent: FC = () => {
    const t = useTranslations("aboutUs"); // Используем ключи из JSON
    const { ref, hasBeenInView } = useHasBeenInView();

    return (
        <Container className="mt-[100px] mb-[200px]">

            <motion.p
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={hasBeenInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, ease: "easeInOut" }}
                className="text-center text-[20px] mt-[24px] max-[500px]:text-[16px] font-medium"
            >
                <motion.b
                    initial={{ opacity: 0 }}
                    animate={hasBeenInView ? { opacity: 1 } : {}}
                    transition={{ duration: 0.6, delay: 0.2 }}
                    className="text-[24px] max-[500px]:text-[20px]"
                >
                    {t("title")}
                </motion.b>
                – {t("description")}
            </motion.p>

            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 20 }}
                animate={hasBeenInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.8, delay: 0.4, ease: "easeInOut" }}
                className="mt-[60px]"
            >
                <p className="text-center text-[24px] font-bold">
                    {t("mission")}
                </p>
            </motion.div>


            <motion.div
                ref={ref}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={hasBeenInView ? { opacity: 1, scale: 1 } : {}}
                transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
            >
                <OurMissions />
            </motion.div>
        </Container>
    );
};
