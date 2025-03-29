"use client"
import { FC, useEffect } from "react";
import { Container, WorkExpItem } from "@/shared/components";
import useWorkExperienceStore from "@/store/useWorkExperienceStore";
import { HasNotExperience } from "@/shared/components/members";
import useProfileStore from "@/store/useProfileStore";
import {WorkExpAdd} from "@/shared/components/profile/work-exp/WorkExpAdd";
import {WorkExpEdit} from "@/shared/components/profile/work-exp/WorkExpEdit";

export const WorkExperienceEdit: FC = () => {
    const { fetchProfile, profile } = useProfileStore();
    const { WorkExperience, fetchWorkExperience } = useWorkExperienceStore();

    useEffect(() => {
        if (!profile) {
            fetchProfile();
        }
    }, [fetchProfile, profile]);

    useEffect(() => {
        if (profile?.id && WorkExperience.length === 0) {
            fetchWorkExperience(profile.id).then((data) => {
                if (data.length === 0) {
                    console.log("Нет опыта работы, останавливаем запросы");
                }
            });
        }
    }, [WorkExperience.length, fetchWorkExperience, profile]);


    return (
        <Container>
            <p className={"text-[24px] font-semibold mt-[30px]"}>Редактирование опыта работы</p>
            {Array.isArray(WorkExperience) && WorkExperience.length > 0 ? (
                <div className="w-full mt-[30px] flex flex-col gap-[28px]">
                    {WorkExperience?.map((item, index) => (
                        <div key={item.id || `work-exp-${index}`} className="relative flex flex-col items-end gap-[20px]">
                            <WorkExpEdit selectedExperience={item} />
                            <WorkExpItem item={item} />
                        </div>
                    ))}
                </div>
            ) : (
                <HasNotExperience />
            )}
            <div className={"mt-[30px] flex justify-center"}>
                <WorkExpAdd/>
            </div>
        </Container>
    );
};
