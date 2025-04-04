import { create } from "zustand";
import { getJobApplications, JobApplication } from "@/api/requestsApi";

interface JobApplicationsState {
  jobApplications: JobApplication[];
  isLoading: boolean;
  fetchJobApplications: () => Promise<void>;
}

const useJobApplicationsStore = create<JobApplicationsState>((set) => ({
  jobApplications: [],
  isLoading: false,
  fetchJobApplications: async () => {
    set({ isLoading: true });
    try {
      // Type is JobApplication[] because getJobApplications returns that
      const data = await getJobApplications();
      set({ jobApplications: data });
    } catch (error) {
      console.error("Error fetching job applications:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default useJobApplicationsStore;
