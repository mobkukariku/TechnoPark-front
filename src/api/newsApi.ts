import {getData, postData, deleteData, patchData} from "./axiosInstance";
import {GetDataParams} from "@/api/dataParams";
import {NewsData} from "@/store/useNewsStore";

export const getNews = async (params: GetDataParams = {}) =>
    getData('/news', params);

export const getNewsByID = async (id: string | Array<string> | undefined) =>
    getData(`/news/${id}`);

export const getLastNews = async (id: string | Array<string> | undefined) =>
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

export const updateNews = async (id: string, data: Partial<NewsData>) =>
    patchData(`/news/${id}`, data, true);