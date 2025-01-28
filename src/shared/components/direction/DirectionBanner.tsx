import { FC } from "react";
import Image from "next/image";
import { Container } from "@/shared/components";

interface DirectionBannerProps {
    title: string;
    imageURL: string;
}

export const DirectionBanner: FC<DirectionBannerProps> = ({ title, imageURL }) => {
    return (
        <Container className="mt-[11px] relative w-full h-[378px]">
            <div className="absolute inset-0 z-20 rounded-[11px] bg-black opacity-35 " />
            <Image
                src={imageURL}
                alt={title}
                layout="fill"
                objectFit="cover"
                className="absolute inset-0 rounded-[11px]"
            />
            <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  z-50 bg-[#EFEFEF87] px-[20px] font-[700] text-[32px] rounded-[16px]">
                {title}
            </p>
        </Container>
    );
};
