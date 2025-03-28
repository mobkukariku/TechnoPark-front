import {FC} from "react";
import {AdminProjectsList, AdminProjectsButtons} from "@/shared/components";

const ProjectsPage:FC = () => {
    return (
        <div>
            <AdminProjectsButtons/>
            <AdminProjectsList />
        </div>
    )
}

export default ProjectsPage;