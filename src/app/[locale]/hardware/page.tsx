import {FC} from "react";
import {DirectionBanner, HardwareInfo, Header, ProjectsList} from "@/shared/components";

const HardwarePage:FC = () => {
    return(
        <>
            <Header />
            <DirectionBanner title={"HARDWARE"} imageURL={"/hardware/banner.png"} />
            <HardwareInfo />
            <ProjectsList />
        </>
    )
}

export default HardwarePage;