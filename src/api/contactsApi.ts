import {deleteData, getData, patchData, postData} from "@/api/axiosInstance";
import {Contacts} from "@/store/useMembersStore";

export const getContactsById = async (id: string | undefined) =>
    getData(`/contacts/${id}`);

export const patchContact = async (id: string | undefined, updatedData: Partial<Contacts>) =>
    patchData(`/contacts/${id}`, updatedData);

export const addContact = async (data: Partial<Contacts>) =>
    postData('/contacts', data);

export const deleteContact = async (id: string | undefined) =>
    deleteData(`/contacts/${id}`);