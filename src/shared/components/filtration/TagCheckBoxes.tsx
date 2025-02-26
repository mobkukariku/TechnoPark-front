"use client"
import {useTagHandler} from "@/hooks/useTagHandler";
import {FC, useEffect} from "react";
import {Tags} from "@/shared/ui";
import useNewsStore from "@/store/useNewsStore";


export const TagCheckboxes: FC<{ isFilter?: boolean, className?:string }> = ({ isFilter = false, className }) => {
    const { tags, handleTag } = useTagHandler(isFilter);

    const {allTags, fetchTags, } = useNewsStore();

    useEffect(() => {
        fetchTags()
    }, []);

    return (
        <div className={`${className}`}>
            {allTags.map(tag => (
                <div key={tag.id} className={``}>
                    <Tags
                        id={tag.id}
                        value={tag.id}
                        checked={tags.includes(tag.id)}
                        onClick={() => handleTag(tag.id)}
                        title={tag.name} />
                </div>
            ))}
        </div>
    );
};
