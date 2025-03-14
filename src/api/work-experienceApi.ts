import {deleteData, getData, patchData, postData} from "@/api/axiosInstance";
import {WorkExperience} from "@/store/useWorkExperienceStore";



export const getWorkExperience = async (userId: string | Array<string> | undefined) =>
    getData(`/work-experience/${userId}`);

export const createWorkExperience = async (data:WorkExperience) =>
    postData('/work-experience', data);

export const updateWorkExperience = async (id: string, data:Partial<WorkExperience>) => {
    patchData(`/work-experience/${id}`, data);
}

export const deleteWorkExperience = async (id: string ) =>
    deleteData(`/work-experience/${id}`)