import { FC } from "react";
import { Skeleton } from "@/shared/ui/skeleton";

export const WorkExperienceSkeleton: FC = () => {
    return (
        <div className={"mt-[100px]"}>
            <Skeleton className="h-[32px] w-[180px] rounded-[8px]" />
            <div className="w-full  mt-[20px] flex flex-col gap-[18px]">
                {[...Array(3)].map((_, index) => (
                    <div
                        key={index}
                        className="border rounded-[8px] py-[15px] flex justify-between px-[30px] border-[#BFD8FF]"
                    >
                        <div>
                            <Skeleton className="h-[18px] w-[200px]" />
                            <Skeleton className="h-[14px] w-[150px] mt-2" />
                            <Skeleton className="h-[14px] w-[520px] mt-3" />
                        </div>
                        <Skeleton className="h-[14px] w-[180px]" />
                    </div>
                ))}
            </div>
        </div>
    );
};
