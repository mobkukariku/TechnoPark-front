import { create } from "zustand";
import {deleteNews, getNews, GetNewsParams, postNews} from "@/api/api";

interface NewsData {
    _id: string;
    title: string;
    content: string;
    imageURL: string;
    tags: string;
    createdAt: string;
    updatedAt: string;
}

interface NewsState {
    newsData: NewsData[];
    isLoading: boolean;
    search: string;
    tags: string;
    filterTags: string;
    sort: string;
    limit: number;
    page: number;
    totalPages: number;
    lastSearchParams: GetNewsParams | null;
    setSearch: (search: string) => void;
    setLimit: (limit: number) => void;
    setFilterTags: (tags: string) => void;
    setTags: (tags: string) => void;
    setSort: (sort: string) => void;
    setPage: (page: number) => void;
    fetchNewsData: () => Promise<void>;
    deleteNews: (id: string) => Promise<void>;
    submitNews: (title: string, content: string, imageFile: File | null, tags: string) => Promise<void>;
}

const useNewsStore = create<NewsState>((set, get) => ({
    newsData: [],
    isLoading: false,
    error: null,
    search: "",
    filterTags: "",
    tags: "",
    limit: 5,
    page: 1,
    totalPages: 0,
    sort: "newest",
    data: null,
    lastSearchParams: null,

    setFilterTags: (filterTags: string) => set({ filterTags }),
    setLimit: (limit: number) => set({limit}),
    setSearch: (search) => set({ search }),
    setTags: (tags) => set({ tags }),
    setSort: (sort) => set({ sort }),
    setPage: (page) => set({ page }),
    fetchNewsData: async () => {
        const { isLoading, search, filterTags, sort, lastSearchParams, page, limit } = get();
        const currentParams: GetNewsParams = { search, tags:filterTags, sort, page, limit };

        if (isLoading || JSON.stringify(currentParams) === JSON.stringify(lastSearchParams)) {
            return;
        }

        set({ isLoading: true, lastSearchParams: currentParams });

        try {
            const response = await getNews(currentParams);
            set({ newsData: response.news.length === 0 ? [] : response.news, totalPages: response.totalPages, isLoading: false });
        } catch (error) {
            set({ newsData: [], isLoading: false,});
            throw error;
        }
    },

    submitNews: async (title, content, image, tags) => {
        const { isLoading } = get();
        if (isLoading) return;

        set({ isLoading: true });

        try {
            const newNews = await postNews(title, content, image, tags);
            set((state) => ({
                newsData: [...state.newsData, newNews],
                isLoading: false,
            }));
        } catch (error) {
            set({ isLoading: false });
            throw error;
        }
    },
    deleteNews: async (id:string) => {
        const { isLoading } = get();
        if (isLoading) return;

        set({ isLoading: false });

        try{
            await deleteNews(id);
            set((state) => ({
                newsData: [...state.newsData,],
            }));
        }catch(error) {
            set({ isLoading: false });
            throw error;
        }
    }
}));

export default useNewsStore;
