import { create } from "zustand";
import {getNews, postNews} from "@/api/api";

interface NewsData {
    title: string;
    content: string;
    imageURL: string;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

interface NewsState {
    newsData: NewsData[];
    isLoading: boolean;
    error: string | null;
    setError: (error: string | null) => void;
    addNews: (news: NewsData) => void;
    setNewsData: (newsData: NewsData[]) => void;
    getNewsData: () => NewsData[];
    fetchNewsData: () => Promise<void>;
    submitNews: (title: string, content: string, imageFile: File | null, tags: string) => Promise<void>;
}

const useNewsStore = create<NewsState>((set, get) => ({
    newsData: [],
    error: null,
    isLoading: false,
    setNewsData: (newsData: NewsData[]) => set({ newsData }),
    getNewsData: () => get().newsData,
    fetchNewsData: async () => {
        set({ isLoading: true });
        try {
            const data = await getNews();
            set({ newsData: data, isLoading: false });
        } catch (error) {
            throw error;
        }finally {
            set({ isLoading: false });
        }
    },
    addNews: (news: NewsData) => {
        set((state) => ({
            newsData: [...state.newsData, news],
        }));
    },
    setError: (error: string | null) => set({ error }),
    submitNews: async (title: string, content: string, image: File | null, tags: string) => {
        set({ isLoading: true, error: null });
        try {
            const newNews = await postNews(title, content, image, tags);
            get().addNews(newNews);
            set({ isLoading: false });
        } catch (error) {
            set({ error: "Failed to post news", isLoading: false });
        }
    },
}));

export default useNewsStore;
