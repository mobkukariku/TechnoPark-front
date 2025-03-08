import {getData} from "@/api/axiosInstance";

export const getWorkExperience = async (userId: string | Array<string> | undefined) =>
    getData(`/work-experience/${userId}`);