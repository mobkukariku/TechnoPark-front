"use client";
import { FC } from "react";
import { Container } from "@/shared/components/";
import Image from "next/image";
import { motion } from "framer-motion";
import { useHasBeenInView } from "@/hooks/useHasBeenInView";

export const SoftwareInfo: FC = () => {
    const { ref, hasBeenInView } = useHasBeenInView();

    return (
        <Container className="my-[200px]">
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={hasBeenInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="flex justify-around flex-wrap"
            >
                {/* Изображение с анимацией */}
                <motion.div
                    initial={{ opacity: 0, x: -50 }}
                    animate={hasBeenInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.2 }}
                >
                    <Image
                        src="/software/info-flat.svg"
                        alt="info"
                        width={507}
                        height={399}
                    />
                </motion.div>

                {/* Текстовый блок с анимацией */}
                <motion.div
                    initial={{ opacity: 0, x: 50 }}
                    animate={hasBeenInView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.8, ease: "easeOut", delay: 0.4 }}
                    className="flex flex-col mt-[50px] max-[1000px]:mb-[100px]"
                >
                    <p className="text-[32px] text-center max-[500px]:text-[24px] font-[600]">
                        Почему{" "}
                        <span className="uppercase text-white font-[700] max-[500px]:text-center bg-[#2D7DFF] px-2 rounded-[8px]">
                            Software
                        </span>{" "}
                        направление?
                    </p>

                    {/* Анимация для списка */}
                    <motion.ul
                        initial={{ opacity: 0, y: 20 }}
                        animate={hasBeenInView ? { opacity: 1, y: 0 } : {}}
                        transition={{ duration: 0.8, ease: "easeOut", delay: 0.6 }}
                        className="space-y-[20px] max-[500px]:space-y-[10px] max-[500px]:mx-[10px] text-[20px] max-[500px]:text-[16px] max-w-[500px] w-full mt-[28px] list-disc list-inside"
                    >
                        <li>
                            Инновационные технологии: мы работаем с самыми современными инструментами разработки.
                        </li>
                        <li>
                            Международный подход: курсы и программы соответствуют мировым стандартам.
                        </li>
                        <li>
                            Практический фокус: студенты и участники получают реальный опыт работы над проектами.
                        </li>
                    </motion.ul>
                </motion.div>
            </motion.div>
        </Container>
    );
};
