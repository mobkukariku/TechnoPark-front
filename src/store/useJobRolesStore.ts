import { create } from "zustand";
import {
  getJobRoles,
  createJobRole as apiCreateJobRole,
  updateJobRole as apiUpdateJobRole,
  deleteJobRole as apiDeleteJobRole,
} from "@/api/requestsApi";

export interface JobRole {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
}

interface JobRolesState {
  jobRoles: JobRole[];
  isLoading: boolean;
  fetchJobRoles: () => Promise<void>;
  createJobRole: (name: string) => Promise<void>;
  updateJobRole: (id: string, name: string, isActive: boolean) => Promise<void>;
  deleteJobRole: (id: string) => Promise<void>;
}

const useJobRolesStore = create<JobRolesState>((set, get) => ({
  jobRoles: [],
  isLoading: false,
  fetchJobRoles: async () => {
    set({ isLoading: true });
    try {
      const data = await getJobRoles();
      set({ jobRoles: data });
    } catch (error) {
      console.error("Error fetching job roles:", error);
    } finally {
      set({ isLoading: false });
    }
  },
  createJobRole: async (name: string) => {
    try {
      await apiCreateJobRole(name);
      // Refresh the roles list after creating a new role
      await get().fetchJobRoles();
    } catch (error) {
      console.error("Error creating job role:", error);
    }
  },
  updateJobRole: async (id: string, name: string, isActive: boolean) => {
    try {
      await apiUpdateJobRole(id, name, isActive);
      // Refresh the roles list after updating
      await get().fetchJobRoles();
    } catch (error) {
      console.error("Error updating job role:", error);
    }
  },
  deleteJobRole: async (id: string) => {
    try {
      await apiDeleteJobRole(id);
      // Refresh the roles list after deletion
      await get().fetchJobRoles();
    } catch (error) {
      console.error("Error deleting job role:", error);
    }
  },
}));

export default useJobRolesStore;
