import { create } from "zustand";
import {deleteNews, getLastNews, getNews, getNewsByID, GetDataParams, postNews} from "@/api/newsApi";
import {getTags} from "@/api/tagsApi"

interface NewsData {
    id: string;
    title: string;
    content: string;
    imageURL: string | null;
    tags: string[];
    createdAt: string;
    updatedAt: string;
}
interface TagsData {
    id: string;
    name: string
}

interface NewsState {
    newsData: NewsData[] ;
    currentNews: NewsData | null;
    lastNews: NewsData[] ;
    isLoading: boolean;
    isLastNewsLoading: boolean;
    search: string;
    allTags: TagsData[] | null ;
    tags: string;
    filterTags: string;
    sort: string;
    limit: number;
    page: number;
    totalPages: number;
    fetchTags: () => Promise<void>;
    lastSearchParams: GetDataParams | null;
    setSearch: (search: string) => void;
    setLimit: (limit: number) => void;
    setCurrentPage: (newsId: string) => void;
    setFilterTags: (tags: string) => void;
    setTags: (tags: string) => void;
    setSort: (sort: string) => void;
    setLastNews: (exceptId: string ) => void;
    setPage: (page: number) => void;
    fetchNewsData: () => Promise<void>;
    deleteNews: (id: string) => Promise<void>;
    submitNews: (title: string, content: string, imageFile: File | null, tags: string) => Promise<void>;
}

const useNewsStore = create<NewsState>((set, get) => ({
    newsData: [],
    isLoading: false,
    isLastNewsLoading: false,
    error: null,
    lastNews: [],
    search: "",
    filterTags: "",
    tags: "",
    limit: 10,
    page: 1,
    allTags: [],
    currentNews: null,
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
        const { search, filterTags, sort, page, limit } = get();
        const currentParams: GetDataParams = { search, tags:filterTags, sort, page, limit };



        set({ isLoading: true, lastSearchParams: currentParams });

        try {
            const response: NewsData[] = await getNews(currentParams) as NewsData[];
            set({ newsData: response.length === 0 ? [] : response, isLoading: false });
        } catch (error) {
            set({ newsData: [], isLoading: false,});
            throw error;
        }
    },

    submitNews: async (title, content, image, tags) => {
        const { isLoading } = get();
        if (isLoading) return;

        set({ isLoading: true });

        const selectedtags = tags.split(",")

        try {
            const newNews: NewsData = await postNews(title, content, image, selectedtags) as NewsData;
            set((state) => ({
                newsData: [...state.newsData, newNews],
                isLoading: false,
            }));
        } catch (error) {
            throw error;
        }finally {
            set({ isLoading: false });
        }
    },
    deleteNews: async (id: string) => {
        const { isLoading, newsData } = get();
        if (isLoading) return;

        set({ isLoading: true });

        try {
            await deleteNews(id);
            set({
                newsData: newsData.filter((news) => news.id !== id),
            });
        } catch (error) {
            console.error("Ошибка при удалении новости:", error);
        } finally {
            set({ isLoading: false });
        }
    },
    setCurrentPage: async (newsId: string) => {
        const { isLoading } = get();
        if (isLoading) return;


        set({ isLoading: true });
        try{
            const selectedNews:NewsData = await getNewsByID(newsId) as NewsData;
            set({ currentNews: selectedNews });
        }catch(error) {
            throw error;
        }finally {
            set({ isLoading: false });
        }
    },
    setLastNews: async (exceptId: string) => {
        const { isLastNewsLoading } = get();
        if (isLastNewsLoading) return;

        set({ isLastNewsLoading: true });
        try{
            const lastNews: NewsData[] = await getLastNews(exceptId) as NewsData[];
            set({ lastNews: lastNews });
        }catch(error) {
            throw error;
        }finally {
            set({ isLastNewsLoading: false });
        }
    },
    fetchTags: async () => {
        const { isLoading } = get();
        if (isLoading) return;

        set({isLoading:true});

        try{
            const data: TagsData[] = await getTags() as TagsData[];
            set({ allTags: data });
        }catch (error){
            throw error;
        }finally {
            set({isLoading:false});
        }
    }

}));

export default useNewsStore;
