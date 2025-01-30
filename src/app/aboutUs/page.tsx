import {FC} from "react";
import {AboutUsBreadcrumb, AboutUsContent, DirectionBanner} from "@/shared/components";

const AboutUsPage:FC = () => {
    return (
        <>
            <AboutUsBreadcrumb />
            <DirectionBanner title={"О НАС"} imageURL={"/aboutus/about-us-banner.png"} />
            <AboutUsContent />
        </>
    )
}

export default AboutUsPage;