"use client"
import { useTagHandler } from "@/hooks/useTagHandler";
import { FC, useEffect } from "react";
import { Tags } from "@/shared/ui";
import useTagsStore from "@/store/useTagsStore";

export const TagCheckboxes: FC<{ isFilter?: boolean; className?: string }> = ({ isFilter = false, className }) => {
    const { selectedTags, handleTag } = useTagHandler(isFilter);
    const { allTags, fetchTags } = useTagsStore();

    useEffect(() => {
        fetchTags();
    }, []);

    return (
        <div className={`${className}`}>
            {allTags.map(tag => (
                <div key={tag.id}>
                    <Tags
                        id={tag.id}
                        value={tag.id}
                        checked={selectedTags.split(",").includes(tag.id)}
                        onClick={() => handleTag(tag.id)}
                        title={tag.name}
                    />
                </div>
            ))}
        </div>
    );
};
