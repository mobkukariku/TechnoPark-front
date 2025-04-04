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
      <ProjectsList id={"d0af6840-96ad-4734-8fbe-713a8637ced4"} />
    </>
  );
};

export default DataSciencePage;
