import {FC} from "react";
import {CustomBreadcrumb, DirectionBanner, Header,  SoftwareInfo} from "@/shared/components";

const SoftwarePage:FC = () => {
    return (
        <>
            <Header />
            <DirectionBanner title={"SOFTWARE"} imageURL={"/software/software.png"} />
            <SoftwareInfo />
        </>
    );
}

export default SoftwarePage;