"use client";
import { FC } from "react";
import Image from "next/image";
import { Container } from "@/shared/components";
import { useHasBeenInView } from "@/hooks/useHasBeenInView";
import { motion } from "framer-motion";

interface DirectionBannerProps {
    title: string;
    imageURL: string;
}

export const DirectionBanner: FC<DirectionBannerProps> = ({ title, imageURL }) => {
    const { ref, hasBeenInView } = useHasBeenInView();

    return (
        <Container className="mb-[100px] mt-[10px] relative w-full">
            <motion.div
                ref={ref}
                initial={{ opacity: 0, y: 50 }}
                animate={hasBeenInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, ease: "easeOut" }}
                className="relative w-full h-[378px] overflow-hidden rounded-[11px]"
            >
                {/* Затемнение */}
                <div className="absolute inset-0 z-20 bg-black opacity-35 rounded-[11px]" />

                {/* Изображение */}
                <Image
                    src={imageURL}
                    alt={title}
                    fill
                    className="absolute z-0 object-cover rounded-[11px]"
                    priority
                />

                {/* Текст */}
                <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-30 bg-[#EFEFEF87] px-[20px] font-[700] text-[32px] rounded-[16px]">
                    {title}
                </p>
            </motion.div>

            {/* Фоновые круги */}
            <div className="absolute z-0 left-[-200px] top-[200px] w-[300px] h-[300px] rounded-full bg-[#4E48FE5C] blur-[100px] opacity-70 max-[500px]:w-[200px] max-[500px]:h-[200px] max-[500px]:left-[-20px] max-[500px]:top-[250px]" />
            <div className="absolute z-0 right-[-200px] top-[550px] w-[330px] h-[330px] rounded-full bg-[#1170FF5C] blur-[100px] opacity-70 max-[500px]:w-[250px] max-[500px]:h-[250px] max-[500px]:right-[0px] max-[500px]:top-[300px]" />
        </Container>
    );
};
