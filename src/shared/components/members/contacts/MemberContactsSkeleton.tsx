import { FC } from "react";
import { Container } from "@/shared/components";
import { Skeleton } from "@/shared/ui/skeleton";

export const MemberContactsSkeleton: FC = () => {
    return (
        <Container className="p-5 max-[500px]:p-0 mt-10">
            <div className="flex flex-col gap-1">
                {Array.from({ length: 4 }).map((_, index) => (
                    <div
                        key={index}
                        className="flex justify-between w-full border-gray-200 pb-2"
                    >
                        <Skeleton className="w-full h-[32px] rounded-[8px]" />
                    </div>
                ))}
            </div>
        </Container>
    );
};
