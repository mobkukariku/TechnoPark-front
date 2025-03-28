import {getData, patchData} from "@/api/axiosInstance";

export const updateProfile = async (id: string, formData: FormData) => {
    return patchData(`/profile/${id}`, formData, true);
};


export const getUserProfile = async (id: string) =>
    getData(`/profile/${id}`);

export const getProfile = async () =>
    getData('/users/me');

