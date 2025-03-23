import {getData, patchData} from "./axiosInstance";
import {Member} from "@/store/useMembersStore";

export const getMembersForAdmins = async (search: string) =>
    getData('/users', { search });

export const getMembersForUsers = async (search: string) =>
    getData('/users/read', { search });


export const getMemberById = async (id:string | Array<string> | undefined) =>
    getData(`/users/${id}`)

export const patchMemberById = async (id: string | Array<string> | undefined, data: Partial<Member>) =>
    patchData(`/users/${id}`, data);
