import {deleteData, getData, patchData, postData} from "./axiosInstance";
import {Department} from "@/store/useDepartmentStore";

export const getDepartments = () =>
    getData("/departments")

export const createDepartment = (data:Department) =>
    postData("/departments", data);

export const updateDepartment = (id:string, data: Partial<Department>) =>
    patchData(`/departments/${id}`, data)

export const deleteDepartment = (id:string) =>
    deleteData(`/departments/${id}`,)