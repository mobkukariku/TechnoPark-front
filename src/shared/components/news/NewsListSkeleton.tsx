import { FC } from "react";
import { Skeleton } from "@/shared/ui/skeleton";


export const NewsListSkeleton: FC = () => {
    return (
        <>
            {Array.from({ length: 5 }).map((_, index) => (
                <div key={index} className={"flex max-[500px]:flex-col gap-[15px] max-[500px]:gap-[0px] relative z-50"}>
                    <div className="relative w-[319px] h-[165px] overflow-hidden rounded-[8px]">
                    <Skeleton className="w-[319px] h-[165px] rounded-[4px]" />
                    </div>
                    <div className={"flex flex-col mt-[10px]"}>
                        <Skeleton className="w-[319px] max-[500px]:w-[200px] h-[25px] rounded-[4px]" />
                        <Skeleton className="w-[89px] h-[15px] rounded-[4px] mt-[10px]" />
                        <span className={"mt-[15px]"}><Skeleton className="w-[400px] max-[500px]:w-[300px] h-[25px] rounded-[4px]" /></span>
                    </div>
                </div>
            ))}
        </>
    );
};


