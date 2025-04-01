"use client";

import { FC } from "react";
import { Button } from "@/shared/ui";
import { Container } from "@/shared/components";
import { useHasBeenInView } from "@/hooks/useHasBeenInView";
import { motion } from "framer-motion";
import { useTranslations } from "next-intl";

export const CampusToor: FC = () => {
  const t = useTranslations("visit");

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
        <p className="font-bold text-2xl sm:text-3xl">{t("title")}</p>
        <span className="text-lg sm:text-xl">{t("description")}</span>
        <Button className="w-full sm:w-fit">{t("button")}</Button>
      </motion.div>
    </Container>
  );
};
