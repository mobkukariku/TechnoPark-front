import {create} from "zustand";
import {GetDataParams, getProjects} from "@/api/api";

interface ImageProps {
    id: string,
    imageUrl: string,
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
}

const useProjectsStore = create<ProjectState>((set, get) => ({
    projects:[],
    isLoading: false,
    search: "",
    sort: "newest",
    limit: 3,
    page: 1,
    departmentId: "",
    totalPages: 0,
    setDepartmentId: (departmentId: string) => set({ departmentId }),
    setLimit: (limit: number) => set({limit}),
    setSearch: (search) => set({ search }),
    setSort: (sort) => set({ sort }),
    setPage: (page) => set({ page }),
    fetchProjectsData: async () => {
        const { isLoading, search,  sort,  page, limit, departmentId } = get();
        const currentParams: GetDataParams = { search,  sort, page, limit, departmentId };

        if (isLoading) return;
        set({ isLoading: true});
        try{
            const response = await getProjects(currentParams);
            set({ projects: response.length === 0 ? [] : response, isLoading:false});
        }catch(error){
            throw error;
        }finally {
            set({ isLoading: false });
        }
    },
}));

export default useProjectsStore;