import {FC} from "react";
import {DirectionBanner, HardwareInfo, ProjectsList} from "@/shared/components";

const HardwarePage:FC = () => {
    return(
        <>
            <DirectionBanner title={"HARDWARE"} imageURL={"/hardware/banner.png"} />
            <HardwareInfo />
            <ProjectsList id={"2"} />
        </>
    )
}

export default HardwarePage;