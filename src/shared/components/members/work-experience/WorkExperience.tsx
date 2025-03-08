"use client"
import { FC, useEffect } from "react";
import { Container } from "@/shared/components";
import useWorkExperienceStore from "@/store/useWorkExperienceStore";
import { WorkExperienceSkeleton } from "./WorkExperienceSkeleton";
import { HasNotExperience } from "@/shared/components/members/work-experience/HasNotExperience";

export const WorkExperience: FC<{ id: string | Array<string> | undefined }> = ({ id }) => {
    const { WorkExperience, fetchWorkExperience, isLoading } = useWorkExperienceStore();

    useEffect(() => {
        if (id) fetchWorkExperience(id as string);
    }, [id]);

    const formatDate = (date: string | Date | null) =>
        date
            ? new Intl.DateTimeFormat("ru-RU", { month: "long", year: "numeric" }).format(new Date(date))
            : "настоящее время";

    return (
        <Container className="mt-[80px] p-[20px] ">
            <p className="text-[20px]  font-semibold">Опыт работы</p>

            {isLoading ? (
                <WorkExperienceSkeleton />
            ) : WorkExperience.length > 0 ? (
                <div className="w-full mt-[20px] flex justify-center items-center flex-col gap-[18px]">
                    {WorkExperience.map((item) => (
                        <div
                            key={item.id}
                            className="border w-full  rounded-[8px] py-[15px] flex justify-between px-[30px] border-[#639EFF]"
                        >
                            <div>
                                <h2 className="text-[18px] font-bold">{item.company}</h2>
                                <p className="text-[14px]">{item.position}</p>
                                <p className="w-[520px] ml-[18px] mt-[15px] text-[14px]">{item.description}</p>
                            </div>
                            <p>{formatDate(item.startDate)} - {formatDate(item.endDate)}</p>
                        </div>
                    ))}
                </div>
            ) : (
                <HasNotExperience />
            )}
        </Container>
    );
};
