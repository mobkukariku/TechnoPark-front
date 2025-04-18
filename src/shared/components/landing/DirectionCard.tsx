import { FC } from "react";
import Image from "next/image";
import { Button } from "@/shared/ui";
import Link from "next/link";
import { useTranslations } from "next-intl";

export interface DirectionCardProps {
  image: string;
  title: string;
  description: string;
  link: string;
  directionImage: string;
}

export const DirectionCard: FC<DirectionCardProps> = ({
  image,
  title,
  description,
  link,
  directionImage,
}) => {
  const t = useTranslations();
  return (
    <div
      className={
        "flex relative overflow-hidden z-50 flex-col px-[31px] pt-[35px] pb-[50px]  w-[330px] max-[500px]:w-[380px] bg-[#D8E7FF] rounded-[22px] border-2 border-[#2D7DFF] justify-center items-center"
      }
    >
      <Image
        src={image}
        alt={title}
        width={363}
        height={168}
        className={"object-cover w-[363px] h-[168px] rounded-[8px]"}
      />
      <div className={"mt-[38px] flex flex-col relative z-50 text-center"}>
        <p className={"uppercase font-[700] text-[24px] mb-[8px]"}>{title}</p>
        <span className={"h-[90px]"}>{description}</span>
        <Link href={link} className={"mt-[32px]"}>
          <Button className={"w-[60%]"}>{t("learnMore")}</Button>
        </Link>
      </div>
      <Image
        className={"absolute z-0 right-0 bottom-0"}
        width={224}
        height={224}
        src={directionImage}
        alt={title}
      />
    </div>
  );
};
