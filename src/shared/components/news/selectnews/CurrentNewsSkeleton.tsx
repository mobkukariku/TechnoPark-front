import {FC} from "react";
import { Skeleton } from "@/shared/ui/skeleton";

export const CurrentNewsSkeleton:FC = () => {
    return (
        <>
            <Skeleton className={"w-[800px] rounded-[8px] h-[30px]"} />
            <hr className={"my-[15px]"}/>
            <div className={"flex  justify-between"}>
                <div className={""}>
                    <Skeleton className={"w-[100px] h-[25px] mb-[10px] rounded-[8px] "} />
                    <div className="relative h-[388px] w-[813px] overflow-hidden rounded-[8px]">
                        <Skeleton className={"h-[388px] w-[813px] rounded-[8px] "} />
                    </div>
                    <div className="flex flex-col gap-[12px] mt-[24px] justify-start">
                        {[...Array(5)].map((_, index) => (
                            <Skeleton key={index} className="h-[38px] w-[800px] rounded-[8px]" />
                        ))}
                    </div>

                </div>
                <div className={"w-[250px]"}>
                    <div className={"flex justify-center"}>
                        <Skeleton className={"h-[30px] mt-[20px] w-[200px] rounded-[8px] "} />
                    </div>
                    <div className={"max-w-[290px] mt-[5px] flex flex-col gap-[10px]"}>
                        <div  className={"flex flex-col  gap-[1px]"}>
                            <Skeleton className={"h-[30px] mt-[20px] w-[200px] rounded-[8px] "} />
                            <Skeleton className={"h-[30px] mt-[20px] w-[200px] rounded-[8px] "} />
                        </div>
                        <hr className={"border-[#CDCDCD]"}/>
                        <div  className={"flex flex-col  gap-[1px]"}>
                            <Skeleton className={"h-[30px] mt-[20px] w-[200px] rounded-[8px] "} />
                            <Skeleton className={"h-[30px] mt-[20px] w-[200px] rounded-[8px] "} />
                        </div>
                        <hr className={"border-[#CDCDCD]"}/>
                        <div  className={"flex flex-col  gap-[1px]"}>
                            <Skeleton className={"h-[30px] mt-[20px] w-[200px] rounded-[8px] "} />
                            <Skeleton className={"h-[30px] mt-[20px] w-[200px] rounded-[8px] "} />
                        </div>
                        <hr className={"border-[#CDCDCD]"}/>
                    </div>
                </div>
            </div>

        </>
    )
}

