import {FC} from "react";
import {DirectionBanner, SoftwareBreadcrumb, SoftwareInfo} from "@/shared/components";

const SoftwarePage:FC = () => {
    return (
        <>
            <SoftwareBreadcrumb />
            <DirectionBanner title={"SOFTWARE"} imageURL={"/software/software.png"} />
            <SoftwareInfo />
        </>
    );
}

export default SoftwarePage;