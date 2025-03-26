import {getData, patchData} from "@/api/axiosInstance";
import {Contacts} from "@/store/useMembersStore";

export const getContactsById = async (id: string | undefined) =>
    getData(`/contacts/${id}`);

export const patchContact = async (id: string | undefined, updatedData: Partial<Contacts>) =>
    patchData(`/contacts/${id}`, updatedData);