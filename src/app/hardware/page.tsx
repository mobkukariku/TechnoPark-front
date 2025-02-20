import {FC} from "react";
import { DirectionBanner, HardwareInfo, Header} from "@/shared/components";

const HardwarePage:FC = () => {
    return(
        <>
            <Header />
            <DirectionBanner title={"HARDWARE"} imageURL={"/hardware/banner.png"} />
            <HardwareInfo />
        </>
    )
}

export default HardwarePage;