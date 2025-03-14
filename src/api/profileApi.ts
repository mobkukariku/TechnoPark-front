import {getData, patchData} from "@/api/axiosInstance";

export const updateProfileContacts = async (id: string, data: {
    position?: string;
    description?: string;
    skills?: string[];
    imageURL?: File | null;
}) => {
    const formData = new FormData();

    formData.append("position", data.position || "");
    formData.append("description", data.description || "");

    data.skills?.forEach((skill, index) => {
        formData.append(`skills[${index}]`, skill);
    });

    if (data.imageURL) {
        formData.append("image", data.imageURL);
    }

    return patchData(`/profile/${id}`, formData);
};

export const getProfileData = async (id: string) =>
    getData(`/profile/${id}`);
