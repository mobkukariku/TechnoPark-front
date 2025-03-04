import { getData } from "./axiosInstance";

export const getMembersForAdmins = async (search: string) =>
    getData('/users', { search });

export const getMembersForUsers = async (search: string) =>
    getData('/members', { search });
