import { FC } from "react";
import { Container } from "@/shared/components";
import { OurMissions } from "@/shared/components/aboutus";
import { useTranslations } from "next-intl";

export const AboutUsContent: FC = () => {
    const t = useTranslations("aboutUs"); // Используем ключи из JSON

    return (
        <Container>
            <p className="text-center text-[20px] mt-[24px] max-[500px]:text-[16px] font-medium">
                <b className="text-[24px] max-[500px]:text-[20px]">{t("title")}</b> – {t("description")}
            </p>

            <div>
                <p className="text-center text-[24px] font-bold mt-[60px]">
                    {t("mission")}
                </p>
                <OurMissions />
            </div>
        </Container>
    );
};
