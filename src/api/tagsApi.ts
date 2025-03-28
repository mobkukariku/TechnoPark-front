import {getData, postData} from "./axiosInstance";

export const getTags = async () => getData('/tags');

export const postTag = async (data: { name: string }) => postData('/tags', data);

export const getDirections = async () => getData('/directions');
