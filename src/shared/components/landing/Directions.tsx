"use client";
import { FC } from "react";
import { Container, DirectionCard } from "../";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useHasBeenInView } from "@/hooks/useHasBeenInView";

export const Directions: FC = () => {
  const t = useTranslations("Directions");
  const { ref, hasBeenInView } = useHasBeenInView(0.2);

  return (
    <Container className="relative z-50 my-[300px]">
      <div className="flex flex-col justify-center items-center mt-[110px]">
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: -20 }}
          animate={hasBeenInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1 }}
          className="text-[32px] font-[700] max-[1000px]:text-[24px]"
        >
          {t("title")}
        </motion.p>
        <motion.span
          ref={ref}
          initial={{ opacity: 0, y: 10 }}
          animate={hasBeenInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 1, delay: 0.2 }}
          className="w-[600px] max-[1000px]:text-[16px] max-[500px]:w-fit mt-[10px] text-center leading-[23px]"
        >
          {t("description")}
        </motion.span>
      </div>

      <div className="mt-[61px] flex flex-wrap gap-[57px] max-[1000px]:gap-[20px] justify-center mb-[113px]">
        {[
          {
            directionImage: "/landing/hardware.svg",
            title: t("hardware.title"),
            description: t("hardware.description"),
            link: "/hardware",
          },
          {
            directionImage: "/landing/software.svg",
            title: t("software.title"),
            description: t("software.description"),
            link: "/software",
          },
          {
            directionImage: "/landing/software.svg",
            title: t("dataScience.title"),
            description: t("dataScience.description"),
            link: "/data-science",
          },
        ].map((item, index) => {
          // eslint-disable-next-line react-hooks/rules-of-hooks
          const { ref, hasBeenInView } = useHasBeenInView(0.2);
          return (
            <motion.div
              ref={ref}
              key={item.link}
              initial={{ opacity: 0, y: 30 }}
              animate={hasBeenInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 1, delay: index * 0.3 }}
            >
              <DirectionCard
                directionImage={item.directionImage}
                image="https://www.figma.com/file/6gbT120loIYOOu4SHCmIli/image/2c77b164a259775e39ad5975d431db95eb332cfc"
                title={item.title}
                description={item.description}
                link={item.link}
              />
            </motion.div>
          );
        })}
      </div>
    </Container>
  );
};
