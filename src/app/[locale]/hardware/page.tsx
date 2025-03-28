import {FC} from "react";
import {DirectionBanner, Footer, HardwareInfo, Header, ProjectsList} from "@/shared/components";

const HardwarePage:FC = () => {
    return(
        <>
            <DirectionBanner title={"HARDWARE"} imageURL={"/hardware/banner.png"} />
            <HardwareInfo />
            <ProjectsList id={"d0af6840-96ad-4734-8fbe-713a8637ced4"} />
        </>
    )
}

export default HardwarePage;