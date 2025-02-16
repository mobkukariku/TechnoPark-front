import {create} from "zustand";
import {GetDataParams, getProjects} from "@/api/api";

interface ProjectData {
    _id: string;
    title: string;
    description: string;
    imageURLs: string[];
    directions: string;
}

interface ProjectState {
    projects: ProjectData[];
    isLoading: boolean;
    direction: string;
    search: string;
    sort: string;
    limit: number;
    page: number;
    totalPages: number;
    setDirection: (direction: string) => void;
    setSearch: (search: string) => void;
    setLimit: (limit: number) => void;
    setSort: (sort: string) => void;
    setPage: (page: number) => void;
    fetchProjectsData: () => Promise<void>;
}

const useProjectsStore = create<ProjectState>((set, get) => ({
    projects:[],
    isLoading: false,
    search: "",
    sort: "newest",
    limit: 10,
    page: 1,
    direction: "",
    totalPages: 0,
    setDirection: (direction: string) => set({ direction }),
    setLimit: (limit: number) => set({limit}),
    setSearch: (search) => set({ search }),
    setSort: (sort) => set({ sort }),
    setPage: (page) => set({ page }),
    fetchProjectsData: async () => {
        const { isLoading, search,  sort,  page, limit, direction } = get();
        const currentParams: GetDataParams = { search,  sort, page, limit, direction };

        if (isLoading) return;
        set({ isLoading: true,});
        try{
            const response = await getProjects(currentParams);
            set({ projects: response.projects.length === 0 ? [] : response.projects, totalPages: response.totalPages, });
        }catch(error){
            throw error;
        }finally {
            set({ isLoading: false });
        }
    },
}));

export default useProjectsStore;