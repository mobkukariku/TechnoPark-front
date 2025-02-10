import useNewsStore from "@/store/useNewsStore";

export const useTagHandler = (isFilter = false) => {
    const { tags, setTags, filterTags, setFilterTags } = useNewsStore();

    const activeTags = isFilter ? filterTags : tags;
    const setActiveTags = isFilter ? setFilterTags : setTags;

    const handleTag = (tag: string) => {
        const isChecked = activeTags.includes(tag);
        const updatedTags = isChecked
            ? activeTags.replace(new RegExp(`\\b${tag}\\b,?`, 'g'), '')
            : activeTags ? `${activeTags},${tag}` : tag;

        setActiveTags(updatedTags);
    };

    return { tags: activeTags, handleTag };
};
