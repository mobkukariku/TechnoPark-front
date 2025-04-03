import { postData, getData, patchData, deleteData } from "@/api/axiosInstance";

export const getPartnershipRequests = async () => {
  return getData("/requests/partnership");
};

export const postPartnershipRequest = async (formData: FormData) => {
  return postData("/requests/partnership", formData);
};

export const getJobApplications = async () => {
  return getData("/requests/job-application");
};

export const postJobApplication = async (formData: FormData) => {
  return postData("/requests/job-application", formData, true);
};

export const getJobRoles = async () => {
  return getData("/requests/job-roles");
};

export const createJobRole = async (name: string) => {
  return postData("/requests/job-roles", { name });
};

export const updateJobRole = async (
  id: string,
  name: string,
  isActive: boolean
) => {
  return patchData(`/requests/job-roles/${id}`, { name, isActive });
};

export const deleteJobRole = async (id: string) => {
  return deleteData(`/requests/job-roles/${id}`);
};
