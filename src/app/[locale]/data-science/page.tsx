import { DirectionBanner, ProjectsList } from "@/shared/components";
import { DataScienceInfo } from "@/shared/components/data-science";
import React from "react";

const DataSciencePage = () => {
  return (
    <>
      <DirectionBanner
        title={"DATA SCIENCE"}
        imageURL={"/data-science/banner.jpg"}
      />
      <DataScienceInfo />
      <ProjectsList id={"3"} />
    </>
  );
};

export default DataSciencePage;
