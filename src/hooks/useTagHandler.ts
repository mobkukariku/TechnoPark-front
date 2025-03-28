import useNewsStore from "@/store/useNewsStore";
import useTagsStore from "@/store/useTagsStore";

export const useTagHandler = (isFilter = false) => {
    const { filterTags, setFilterTags } = useNewsStore();
    const { allTags } = useTagsStore(); // ✅ Теперь правильно используем теги

    const activeTags = isFilter ? filterTags : "";
    const setActiveTags = isFilter ? setFilterTags : () => {}; // Если `isFilter = false`, функция заглушка

    const handleTag = (tag: string) => {
        const isChecked = activeTags.includes(tag);
        const updatedTags = isChecked
            ? activeTags.replace(new RegExp(`\\b${tag}\\b,?`, "g"), "").trim()
            : activeTags ? `${activeTags},${tag}` : tag;

        setActiveTags(updatedTags);
    };

    return { tags: allTags, selectedTags: activeTags, handleTag };
};
