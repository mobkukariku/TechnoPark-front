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
            <div className="absolute overflow-hidden inset-0 z-20 rounded-[11px] bg-black opacity-35 " />
            <Image
                src={imageURL}
                alt={title}
                layout="fill"
                objectFit="cover"
                className="absolute z-0 rounded-[11px] "
            />
            <p className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  z-20 bg-[#EFEFEF87] px-[20px] font-[700] text-[32px] rounded-[16px]">
                {title}
            </p>
            <div className={"absolute z-0 rounded-full left-[-200px]  max-[500px]:w-[200px] max-[500px]:h-[200px] blur-[100px]  max-[500px]:left-[-20px] max-[500px]:top-[250px]  opacity-70 top-[200px] w-[300px] h-[300px] bg-[#4E48FE5C]"}/>
            <div className={"absolute z-0 rounded-full right-[-200px]  max-[500px]:w-[250px] max-[500px]:h-[250px] blur-[100px]  opacity-70 max-[500px]:right-[0px] max-[500px]:top-[300px]  top-[550px] w-[330px] h-[330px] bg-[#1170FF5C]"}/>
        </Container>
    );
};
