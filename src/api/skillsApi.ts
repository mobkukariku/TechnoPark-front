import {getData, postData} from "@/api/axiosInstance";

export const getSkills = async () =>
    getData(`/skills`);

export const getUserSkills = async (userId: string | undefined) =>
    getData(`/skills/user/${userId}`);

export const addSkill = async (data: { name: string }) =>
    postData(`/skills/assign`, data);