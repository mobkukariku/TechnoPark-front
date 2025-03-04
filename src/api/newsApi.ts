import { getData, postData, deleteData } from "./axiosInstance";

export interface GetDataParams {
    tags?: string;
    search?: string;
    sort?: string;
    date?: string | null;
    page?: number;
    limit?: number;
    departmentId?: string;
}

export const getNews = async (params: GetDataParams = {}) =>
    getData('/news', params);

export const getNewsByID = async (id: string) =>
    getData(`/news/${id}`);

export const getLastNews = async (id: string) =>
    getData(`/news/lastnews/${id}`);

export const postNews = async (
    title: string,
    content: string,
    imageFile: File | null,
    tags: string[]
) => {
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (imageFile) formData.append('image', imageFile);
    tags.forEach(tag => formData.append("tagIds[]", tag));

    return postData('/news', formData, true);
};

export const deleteNews = async (id: string) =>
    deleteData(`/news/${id}`);
