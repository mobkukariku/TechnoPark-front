"use client";
import { FC } from "react";

export interface TagsProps {
    id: string;
    value: string;
    checked: boolean;
    onClick: () => void;
    title: string;
    className?: string;
}

const getColorFromTitle = (title: string): string => {
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
        hash = title.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash % 360);
    return `hsla(${hue}, 70%, 75%, 0.3)`;
};

const getBorderColor = (title: string): string => {
    let hash = 0;
    for (let i = 0; i < title.length; i++) {
        hash = title.charCodeAt(i) + ((hash << 5) - hash);
    }
    const hue = Math.abs(hash % 360);
    return `hsla(${hue}, 70%, 75%, 0.9)`;
};

export const Tags: FC<TagsProps> = ({ title, checked, onClick, className }) => {
    const bgColor = getColorFromTitle(title);
    const borderColor = getBorderColor(title);

    return (
        <div
            onClick={onClick}
            className={`flex w-fit flex-wrap cursor-pointer gap-[10px] font-medium rounded-full p-1 text-[14px] px-[25px] text-center transition-all duration-300 ${className}`}
            style={{
                backgroundColor: checked ? borderColor : bgColor,
                border: `2px solid ${borderColor}`,
                color: checked ? "white" : "black",
            }}
        >
            {title}
        </div>
    );
};
