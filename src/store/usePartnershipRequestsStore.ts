import { create } from "zustand";
import { getPartnershipRequests, PartnershipRequest } from "@/api/requestsApi";

interface PartnershipRequestsState {
  requests: PartnershipRequest[];
  isLoading: boolean;
  fetchRequests: () => Promise<void>;
}

const usePartnershipRequestsStore = create<PartnershipRequestsState>((set) => ({
  requests: [],
  isLoading: false,
  fetchRequests: async () => {
    set({ isLoading: true });
    try {
      const data = await getPartnershipRequests();
      console.log(data);
      set({ requests: data });
    } catch (error) {
      console.error("Error fetching partnership requests:", error);
    } finally {
      set({ isLoading: false });
    }
  },
}));

export default usePartnershipRequestsStore;
