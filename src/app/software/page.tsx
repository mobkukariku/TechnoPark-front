import {FC} from "react";
import {CustomBreadcrumb, DirectionBanner, Header,  SoftwareInfo} from "@/shared/components";

const SoftwarePage:FC = () => {
    return (
        <>
            <Header />
            <CustomBreadcrumb name={"Software"} link={"/software"} />
            <DirectionBanner title={"SOFTWARE"} imageURL={"/software/software.png"} />
            <SoftwareInfo />
        </>
    );
}

export default SoftwarePage;