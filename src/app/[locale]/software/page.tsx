import {FC} from "react";
import {DirectionBanner, Header, ProjectsList, SoftwareInfo} from "@/shared/components";

const SoftwarePage:FC = () => {
    return (
        <>
            <Header />
            <DirectionBanner title={"SOFTWARE"} imageURL={"/software/software.png"} />
            <SoftwareInfo />
            <ProjectsList />
        </>
    );
}

export default SoftwarePage;