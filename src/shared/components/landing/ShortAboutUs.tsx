"use client"
import { FC } from "react";
import { Button } from "@/shared/ui";
import { Container } from "@/shared/components";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useHasBeenInView } from "@/hooks/useHasBeenInView";

export const ShortAboutUs: FC = () => {
    const t = useTranslations("ShortAboutUs");
    const { ref, hasBeenInView } = useHasBeenInView(0.2);

    return (
        <Container className="my-[300px]">
            <div ref={ref} className="max-w-[973px] mx-auto flex flex-col gap-5">
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={hasBeenInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.5 }}
                >
                    <p className="text-[32px] font-bold max-[500px]:text-[24px]">{t("title")}</p>
                    <hr className="w-[200px] border-2 border-[#2D7DFF]" />
                </motion.div>

                <motion.span
                    initial={{ opacity: 0, y: 20 }}
                    animate={hasBeenInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                    className="text-[20px] font-[500] leading-[29px] max-[500px]:text-[16px] max-[500px]:leading-[25px]"
                >
                    {t("description")}
                </motion.span>

                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={hasBeenInView ? { opacity: 1, y: 0 } : {}}
                    transition={{ duration: 1 }}
                    className="flex justify-end"
                >
                    <Link href="/aboutUs">
                        <Button className="text-[18px]" variant="outline">
                            {t("button")}
                        </Button>
                    </Link>
                </motion.div>
            </div>
        </Container>
    );
};
