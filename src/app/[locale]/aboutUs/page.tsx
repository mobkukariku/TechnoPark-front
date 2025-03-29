import { FC } from "react";
import {AboutUsContent, DirectionBanner} from "@/shared/components";
import { useTranslations } from "next-intl";

const AboutUsPage: FC = () => {
    const t = useTranslations("aboutUs");

    return (
        <>
            <DirectionBanner title={t("pageTitle")} imageURL={"/aboutus/about-us-banner.png"} />
            <AboutUsContent />
        </>
    );
};

export default AboutUsPage;
