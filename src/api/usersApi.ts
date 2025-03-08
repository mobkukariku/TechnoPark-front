import { getData } from "./axiosInstance";

export const getMembersForAdmins = async (search: string) =>
    getData('/users', { search });

export const getMembersForUsers = async (search: string) =>
    getData('/users/read', { search });


export const getMemberById = async (id:string | Array<string> | undefined) =>
    getData(`/users/${id}`)