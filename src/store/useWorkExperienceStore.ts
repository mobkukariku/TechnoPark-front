import { create } from "zustand";
import {
    createWorkExperience,
    deleteWorkExperience,
    getWorkExperience,
    updateWorkExperience
} from "@/api/work-experienceApi";

export type WorkExperience = {
    id?: string;
    userId: string;
    company: string;
    position: string;
    startDate: Date; // Должно быть string, а не Date
    endDate?: Date | null; // Тоже приводим к строке
    description?: string | null;
};


export type WorkExperienceState = {
    WorkExperience: WorkExperience[];
    isLoading: boolean;
    fetchWorkExperience: (userId: string | Array<string> | undefined) => Promise<WorkExperience[]>;
    addWorkExperience: (data:WorkExperience) => void;
    updateWorkExperience:(id:string, data: Partial<WorkExperience>) => void;
    deleteWorkExperience:(id:string ) => void;
};

const useWorkExperienceStore = create<WorkExperienceState>((set, get) => ({
    WorkExperience: [],
    isLoading: false,
    fetchWorkExperience: async (userId: string | Array<string> | undefined) => {
        const { isLoading } = get();
        if (isLoading) return [];

        set({ isLoading: true });


        try {
            const data: WorkExperience[] = await getWorkExperience(userId) as WorkExperience[];


            set({ WorkExperience: data })
            return data;
        } catch (err) {
            throw err;
        } finally {
            set({ isLoading: false });
        }
    },
    addWorkExperience: async (data: WorkExperience) => {
        try {
            await createWorkExperience(data);
            set((state) => ({
                WorkExperience: [...state.WorkExperience, data],
            }));
        } catch (error) {
            throw error
        }
    },
    updateWorkExperience: async (id: string, data: Partial<WorkExperience>) => {
        try {
            await updateWorkExperience(id, data);
            set((state) => ({
                WorkExperience: state.WorkExperience.map((exp) =>
                    exp.id === id ? { ...exp, ...data } : exp
                ),
            }));
        } catch (error) {
            throw error;
        }
    },
    deleteWorkExperience: async (id: string) => {
        if (!id) return;

        try {
            await deleteWorkExperience(id);
            set((state) => {
                const updatedExperiences = state.WorkExperience.filter((exp) => exp.id !== id);
                return {
                    WorkExperience: updatedExperiences,
                    isLoading: updatedExperiences.length === 0,
                };
            });
        } catch (error) {
            throw error;
        }
    }

}));

export default useWorkExperienceStore;
