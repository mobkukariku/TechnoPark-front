import {postData} from "./axiosInstance";

export const login = async (email: string, password: string) =>
    postData('/auth/login', { email, password });

export const logout = async () =>
    postData('/auth/logout');
