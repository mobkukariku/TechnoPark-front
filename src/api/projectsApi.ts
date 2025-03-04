import { getData, postData } from "./axiosInstance";
import { GetDataParams } from "./newsApi";

export const getProjects = async (params: GetDataParams = {}) =>
    getData('/projects', params);

export const createProject = async ({
                                        title, description, departmentId, images
                                    }: {
    title: string;
    description: string;
    departmentId: string;
    images: File[];
}) => {
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("departmentId", departmentId);
    images.forEach((image) => formData.append("images", image));

    return postData("/projects", formData, true);
};
