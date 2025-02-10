import {useTagHandler} from "@/hooks/useTagHandler";
import {FC} from "react";
import {Checkbox} from "@/shared/ui";

const TAGS = ["guests", "events", "competitions", "other"];

export const TagCheckboxes: FC<{ isFilter?: boolean, className?:string }> = ({ isFilter = false, className }) => {
    const { tags, handleTag } = useTagHandler(isFilter);

    return (
        <div className={`${className} flex  gap-[15px]`}>
            {TAGS.map(tag => (
                <div key={tag} className={` flex items-center gap-[5px]`}>
                    <Checkbox id={tag} value={tag} checked={tags.includes(tag)} onClick={() => handleTag(tag)} />
                    <label htmlFor={tag} className="font-medium leading-none">{tag}</label>
                </div>
            ))}
        </div>
    );
};
