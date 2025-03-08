import { create } from "zustand";
import { getWorkExperience } from "@/api/work-experienceApi";

export type WorkExperience = {
    id: string;
    userId: string;
    company: string;
    position: string;
    startDate: Date;
    endDate: Date;
    description: string;
};

export type WorkExperienceState = {
    WorkExperience: WorkExperience[];
    isLoading: boolean;
    fetchWorkExperience: (userId: string | Array<string> | undefined) => Promise<WorkExperience[]>;
};

const useWorkExperienceStore = create<WorkExperienceState>((set, get) => ({
    WorkExperience: [],
    isLoading: false,
    fetchWorkExperience: async (userId: string | Array<string> | undefined) => {
        const { isLoading } = get();

        set({ isLoading: true });

        if (isLoading) return [];

        try {
            const data: WorkExperience[] = await getWorkExperience(userId) as WorkExperience[];
            set({ WorkExperience: data });
            return data;
        } catch (err) {
            throw err;
        } finally {
            set({ isLoading: false });
        }
    },
}));

export default useWorkExperienceStore;
