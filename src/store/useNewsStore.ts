import { create } from "zustand";
import { GetDataParams } from "@/api/dataParams";
import {deleteNews, getLastNews, getNews, getNewsByID, postNews, updateNews} from "@/api/newsApi";

export interface NewsData {
    id: string;
    title: string;
    content: string;
    imageURL: string | null;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}

interface NewsState {
    newsData: NewsData[];
    currentNews: NewsData | null;
    lastNews: NewsData[];
    isLoading: boolean;
    isLastNewsLoading: boolean;
    search: string;
    filterTags: string;
    sort: string;
    limit: number;
    page: number;
    totalPages: number;
    lastSearchParams: GetDataParams | null;
    setSearch: (search: string) => void;
    setLimit: (limit: number) => void;
    setPage: (page: number) => void;
    setFilterTags: (tags: string) => void;
    setSort: (sort: string) => void;
    fetchNewsData: () => Promise<void>;
    deleteNews: (id: string) => Promise<void>;
    submitNews: (title: string, content: string, imageFile: File | null, tags: string) => Promise<void>;
    setCurrentNews: (newsId: string | Array<string> | undefined) => Promise<void>;
    setLastNews: (exceptId: string | Array<string> | undefined) => Promise<void>;
    setLoading: (loading: boolean) => void;
    updateNews: (id:string, data: Partial<NewsData>) => Promise<void>;

}


const useNewsStore = create<NewsState>((set, get) => ({
    newsData: [],
    currentNews: null,
    lastNews: [],
    isLoading: true,
    isLastNewsLoading: false,
    search: "",
    filterTags: "",
    sort: "newest",
    limit: 10,
    page: 1,
    totalPages: 0,
    lastSearchParams: null,

    setSearch: (search) => set({ search }),
    setLimit: (limit) => set({ limit }),
    setPage: (page) => set({ page }),
    setFilterTags: (filterTags) => set({ filterTags }),
    setSort: (sort) => set({ sort }),
    setLoading: (loading: boolean) => set({ isLoading: loading }),


    fetchNewsData: async () => {
        const { search, filterTags, sort, page, limit, lastSearchParams } = get();

        const currentParams: GetDataParams = { search, tags: filterTags, sort, page, limit };

        if (JSON.stringify(lastSearchParams) === JSON.stringify(currentParams)) return;

        // Перемещаем сюда, чтобы fetch запускался корректно
        set({ isLoading: true, lastSearchParams: currentParams });

        try {
            const response: NewsData[] = await getNews(currentParams) as NewsData[];
            set({ newsData: response, isLoading: false });
        } catch (error) {
            console.error("Ошибка загрузки новостей:", error);
            set({ newsData: [], isLoading: false });
        }
    },
    submitNews: async (title, content, image, tags) => {
        const { isLoading } = get();
        if (isLoading) return;

        set({ isLoading: true });

        try {
            const newNews: NewsData = await postNews(title, content, image, tags.split(",")) as NewsData;
            set((state) => ({
                newsData: [...state.newsData, newNews],
                isLoading: false,
            }));
        } catch (error) {
            console.error("Ошибка при создании новости:", error);
        } finally {
            set({ isLoading: false });
        }
    },

    deleteNews: async (id) => {
        const { isLoading, newsData } = get();
        if (isLoading) return;

        set({ isLoading: true });

        try {
            await deleteNews(id);
            set({ newsData: newsData.filter((news) => news.id !== id) });
        } catch (error) {
            console.error("Ошибка при удалении новости:", error);
        } finally {
            set({ isLoading: false });
        }
    },

    setCurrentNews: async (newsId) => {
        set({ isLoading: true });
        try {
            const selectedNews: NewsData = await getNewsByID(newsId) as NewsData;
            set({ currentNews: selectedNews });
        } catch (error) {
            console.error("Ошибка загрузки новости:", error);
        } finally {
            set({ isLoading: false });
        }
    },

    setLastNews: async (exceptId) => {
        set({ isLastNewsLoading: true });
        try {
            const lastNews: NewsData[] = await getLastNews(exceptId) as NewsData[];
            set({ lastNews });
        } catch (error) {
            console.error("Ошибка загрузки последних новостей:", error);
        } finally {
            set({ isLastNewsLoading: false });
        }
    },
    updateNews: async (id, data) => {
        const { isLoading, newsData } = get();
        if (isLoading) return;

        set({ isLoading: true });

        try {
            await updateNews(id, data);
            const updatedNews = newsData.map((news) => (news.id === id ? { ...news, ...data } : news));
            set({ newsData: updatedNews });
        } catch (error) {
            console.error("Ошибка при обновлении новости:", error);
        } finally {
            set({isLoading: false});
        }
    }
}));

export default useNewsStore;
