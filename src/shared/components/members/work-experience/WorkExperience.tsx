"use client"
import { FC, useEffect } from "react";
import {Container, WorkExpItem} from "@/shared/components";
import useWorkExperienceStore from "@/store/useWorkExperienceStore";
import { WorkExperienceSkeleton } from "./WorkExperienceSkeleton";
import { HasNotExperience } from "@/shared/components/members/work-experience/HasNotExperience";

export const WorkExperience: FC<{ id: string | Array<string> | undefined }> = ({ id }) => {
    const { WorkExperience, fetchWorkExperience, isLoading } = useWorkExperienceStore();

    useEffect(() => {
        if (id) fetchWorkExperience(id as string);
    }, [id]);

    return (
        <Container className="mt-[80px] p-[20px] ">
            <p className="text-[20px]  font-semibold">Опыт работы</p>

            {isLoading ? (
                <WorkExperienceSkeleton />
            ) : WorkExperience.length > 0 ? (
                <div className="w-full mt-[20px] flex justify-center items-center flex-col gap-[18px]">
                    {WorkExperience.map((item) => (
                        <WorkExpItem key={item.id} item={item} />
                    ))}
                </div>
            ) : (
                <HasNotExperience />
            )}
        </Container>
    );
};
