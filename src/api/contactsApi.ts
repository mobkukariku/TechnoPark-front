import {getData} from "@/api/axiosInstance";

export const getContactsById = async (id: string | undefined) =>
    getData(`/contacts/${id}`);