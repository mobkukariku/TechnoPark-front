"use client";

import { FC } from "react";
import { Button } from "@/shared/ui";
import { Container } from "@/shared/components";
import { useHasBeenInView } from "@/hooks/useHasBeenInView";
import { motion } from "framer-motion";

export const CampusToor: FC = () => {
    const { ref, hasBeenInView } = useHasBeenInView();

    return (
        <Container className="my-[200px]">
            <motion.div
                ref={ref}
                className="flex max-w-[600px] w-full my-12 mx-auto gap-5 flex-col justify-center items-center px-4 text-center"
                initial={{ opacity: 0, y: 50 }} // Стартовая позиция (ниже на 50px)
                animate={hasBeenInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: "easeOut" }}
            >
                <p className="font-bold text-2xl sm:text-3xl">Запланируйте визит</p>
                <span className="text-lg sm:text-xl">
                    Хотите узнать больше о нашем технопарке? Запишитесь на экскурсию и познакомьтесь с нашими
                    лабораториями, разработками и резидентами!
                </span>
                <Button className="w-full sm:w-fit">Оставить заявку</Button>
            </motion.div>
        </Container>
    );
};
