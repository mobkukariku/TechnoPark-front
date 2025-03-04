import { postData, getData } from "./axiosInstance";

export const login = async (email: string, password: string) =>
    postData('/auth/login', { email, password });

export const logout = async () =>
    postData('/auth/logout');

export const getProfile = async () =>
    getData('/users/me');
