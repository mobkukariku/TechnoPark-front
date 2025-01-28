import {FC} from "react";
import {DirectionBanner, HardwareBreadcrumb} from "@/shared/components";

const HardwarePage:FC = () => {
    return(
        <>
            <HardwareBreadcrumb />
            <DirectionBanner title={"HARDWARE"} imageURL={"/hardware/banner.png"} />
        </>
    )
}

export default HardwarePage;