import {FC} from "react";
import {DirectionBanner, Footer, Header, ProjectsList, SoftwareInfo} from "@/shared/components";

const SoftwarePage:FC = () => {
    return (
        <>
            <DirectionBanner title={"SOFTWARE"} imageURL={"/software/software.png"} />
            <SoftwareInfo />
            <ProjectsList id={"137db4ee-88fb-4480-a5df-c09f6b1dde19"} />
        </>
    );
}

export default SoftwarePage;