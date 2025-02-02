import {FC} from "react";
import {CustomBreadcrumb, DirectionBanner, HardwareInfo, Header} from "@/shared/components";

const HardwarePage:FC = () => {
    return(
        <>
            <Header />
            <CustomBreadcrumb name={"Hardware"} link={"/hardware"} />
            <DirectionBanner title={"HARDWARE"} imageURL={"/hardware/banner.png"} />
            <HardwareInfo />
        </>
    )
}

export default HardwarePage;