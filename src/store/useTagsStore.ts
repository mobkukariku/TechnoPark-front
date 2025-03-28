import { create } from "zustand";
import {getTags, postTag} from "@/api/tagsApi";

export type TagsData = {
    id: string;
    name: string;
}

interface TagsState {
    allTags: TagsData[];
    isLoading: boolean;
    fetchTags: () => Promise<void>;
    addTag: (tag: { name: string }) => void;
}

const useTagsStore = create<TagsState>((set, get) => ({
    allTags: [],
    isLoading: false,

    fetchTags: async () => {
        const { isLoading } = get();
        if (isLoading) return;

        set({ isLoading: true });

        try {
            const data: TagsData[] = await getTags() as TagsData[];
            set({ allTags: data });
        } catch (error) {
            console.error("Ошибка загрузки тегов:", error);
        } finally {
            set({ isLoading: false });
        }
    },
    addTag: async (tag: {name:string}) => {
        const { isLoading, allTags } = get();

        set({ isLoading: true });

        try {
            const data: TagsData = await postTag(tag) as TagsData;
            set({ allTags: [...allTags, data] });
        } catch (error) {
            console.error("Ошибка при добавлении тега:", error);
            throw error;
        } finally {
            set({ isLoading: false });
        }
    }

}));

export default useTagsStore;
