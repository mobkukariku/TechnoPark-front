import {Skeleton} from "@/shared/ui/skeleton";
import {FC} from "react";

export const ShortNewsSkeleton: FC = () => {
    return <Skeleton className="h-[350px] w-[343px] rounded-[8px] bg-white/60" />
}