import {create} from "zustand";
import {createProject as createProjectAPI, getProjects} from "@/api/projectsApi";

interface ImageProps {
    id: string;
    imageUrl: string;
}

interface ProjectData {
    id: string;
    title: string;
    description: string;
    images: ImageProps[];
    departmentId: string;
}

interface ProjectState {
    projects: ProjectData[];
    isLoading: boolean;
    departmentId: string;
    search: string;
    sort: string;
    limit: number;
    page: number;
    totalPages: number;
    setDepartmentId: (departmentId: string) => void;
    setSearch: (search: string) => void;
    setLimit: (limit: number) => void;
    setSort: (sort: string) => void;
    setPage: (page: number) => void;
    fetchProjectsData: () => Promise<void>;
    createProject: (data: { title: string; description: string; departmentId: string; images: File[] }) => Promise<void>;
}

const useProjectsStore = create<ProjectState>((set, get) => ({
    projects: [],
    isLoading: false,
    search: "",
    sort: "newest",
    limit: 3,
    page: 1,
    departmentId: "",
    totalPages: 0,
    setDepartmentId: (departmentId: string) => set({ departmentId }),
    setLimit: (limit: number) => set({ limit }),
    setSearch: (search) => set({ search }),
    setSort: (sort) => set({ sort }),
    setPage: (page) => set({ page }),

    fetchProjectsData: async () => {
        const { isLoading } = get();

        if (isLoading) return;
        set({ isLoading: true });

        try {
            const response: ProjectData[] = await getProjects() as ProjectData[];
            set({ projects: response.length === 0 ? [] : response, isLoading: false });
        } catch (error) {
            console.error("Ошибка загрузки проектов:", error);
        } finally {
            set({ isLoading: false });
        }
    },

    createProject: async ({ title, description, departmentId, images }) => {
        set({ isLoading: true });

        try {
            const data: ProjectData = await createProjectAPI({title, description, departmentId, images}) as ProjectData;

            set((state) => ({
                projects: [...state.projects, data],
                isLoading: false,
            }));
        } catch (error) {
            console.error("Ошибка при создании проекта:", error);
            set({ isLoading: false });
        }
    },
}));

export default useProjectsStore;
