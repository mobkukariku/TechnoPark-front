import {create} from "zustand";
import {getUserSkills, getSkills, addSkill} from "@/api/skillsApi";

export type SkillsData = {
    id: string;
    name: string;
}

interface SkillsState {
    skills: SkillsData[];
    AllSkills: SkillsData[];
    isLoading: boolean;
    fetchAllSkills: () => Promise<void>;
    fetchUserSkills: (userId: string | undefined) => Promise<void>;
    addSkill: (skill: { name: string }) => void;
}


const useSkillsStore = create<SkillsState>((set) => ({
    skills: [],
    AllSkills: [],
    isLoading: false,
    fetchAllSkills: async () => {
        set({ isLoading: true });
        try {
            const data: SkillsData[] = await getSkills() as SkillsData[];
            set({ AllSkills: data });
        } catch (error) {
            console.error("Ошибка загрузки навыков:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },
    fetchUserSkills: async (userId: string | undefined) => {
        set({ isLoading: true });
        try {
            const data: SkillsData[] = await getUserSkills(userId) as SkillsData[];
            set({ skills: data });
        } catch (error) {
            console.error("Ошибка загрузки навыков:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },
    addSkill: async (skill: {name:string}) => {
            set({ isLoading: true });
            try {
                await addSkill(skill) as SkillsData;
            } catch (error) {
                console.error("Ошибка при добавлении навыка:", error);
                throw error;
            } finally {
                set({ isLoading: false });
            }
        },
}));

export default useSkillsStore;