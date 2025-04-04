import { postData, getData, patchData, deleteData } from "@/api/axiosInstance";

export interface JobRole {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface Attachment {
  id: string;
  path: string;
  originalName: string;
  mimeType: string;
  size: number;
}

export interface PartnershipRequest {
  id: string;
  title: string;
  description: string;
  senderName: string;
  email: string;
  createdAt: string;
  updatedAt: string;
  attachments: Attachment[];
}

export interface JobApplication {
  id: string;
  fullName: string;
  email: string;
  telegramUsername: string;
  cvPath: string;
  cvOriginalName: string;
  cvSize: number;
  coverLetterPath: string;
  coverLetterOriginalName: string;
  coverLetterSize: number;
  createdAt: string;
  updatedAt: string;
}

// 2) Return typed data
export const getPartnershipRequests = async (): Promise<
  PartnershipRequest[]
> => {
  return getData<PartnershipRequest[]>("/requests/partnership");
};

export const postPartnershipRequest = async (formData: FormData) => {
  return postData("/requests/partnership", formData, true);
};

export const getJobApplications = async (): Promise<JobApplication[]> => {
  return getData<JobApplication[]>("/requests/job-application");
};

export const postJobApplication = async (formData: FormData) => {
  return postData("/requests/job-application", formData, true);
};

export const getJobRoles = async (): Promise<JobRole[]> => {
  return getData<JobRole[]>("/requests/job-roles");
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
