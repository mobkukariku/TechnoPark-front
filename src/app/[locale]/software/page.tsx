import {FC} from "react";
import {DirectionBanner, ProjectsList, SoftwareInfo} from "@/shared/components";

const SoftwarePage:FC = () => {
    return (
        <>
            <DirectionBanner title={"SOFTWARE"} imageURL={"/software/software.png"} />
            <SoftwareInfo />
            <ProjectsList id={"1"} />
        </>
    );
}

export default SoftwarePage;