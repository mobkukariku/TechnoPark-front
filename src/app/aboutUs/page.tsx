import {FC} from "react";
import { AboutUsContent, CustomBreadcrumb, DirectionBanner, Header} from "@/shared/components";

const AboutUsPage:FC = () => {
    return (
        <>
            <Header />
            <CustomBreadcrumb name={"О нас"} link={"/aboutUs"} />
            <DirectionBanner title={"О НАС"} imageURL={"/aboutus/about-us-banner.png"} />
            <AboutUsContent />
        </>
    )
}

export default AboutUsPage;