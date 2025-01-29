import {FC} from "react";
import {DirectionBanner, HardwareBreadcrumb, HardwareInfo} from "@/shared/components";

const HardwarePage:FC = () => {
    return(
        <>
            <HardwareBreadcrumb />
            <DirectionBanner title={"HARDWARE"} imageURL={"/hardware/banner.png"} />
            <HardwareInfo />
        </>
    )
}

export default HardwarePage;