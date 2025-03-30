import { FC } from "react";
import { Skeleton } from "@/shared/ui/skeleton";

export const MemberSkeleton: FC = () => {
    return (
        <div className="flex flex-col justify-center items-center">
            <Skeleton className="w-[202px] h-[202px] max-[500px]:w-[137px] max-[500px]:h-[137px] rounded-full" />
            <div className="text-center mt-[20px] w-full flex flex-col gap-[2px]">
                <Skeleton className="w-[250px] h-[24px] max-[500px]:h-[20px] rounded-md mx-auto" />
                <Skeleton className="w-[150px] h-[18px] max-[500px]:h-[14px] rounded-md mx-auto mt-1" />
            </div>
        </div>
    );
};
