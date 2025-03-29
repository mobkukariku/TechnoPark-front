"use client";
import { FC, useEffect } from "react";
import { Container } from "@/shared/components";
import useProfileStore from "@/store/useProfileStore";
import useSkillsStore from "@/store/useSkillsStore";
import useMembersStore from "@/store/useMembersStore";

interface SkillsListProps {
    memberProfile?: {
        skills?: string[];
    };
}

export const SkillsList: FC<SkillsListProps> = () => {
    const { currentMember } = useMembersStore();
    const { fetchUserSkills, skills } = useSkillsStore();
    const { profile } = useProfileStore();

    const id:string | undefined = currentMember?.id ?? profile?.id;

    useEffect(() => {
        fetchUserSkills(id);
    }, [fetchUserSkills, id]);

    return (
        <Container className="mt-[70px] p-[20px]">
            <p className="text-[20px] font-semibold">Навыки</p>
            <div className="flex mx-auto gap-[10px] flex-wrap mt-[20px]">
                {skills.length > 0 ? (
                    skills.map((skill) => (
                        <div
                            key={skill.id}
                            className="bg-[#2D7DFF] px-[20px] py-[6px] rounded-[6px] hover:bg-[#0053DB] transition-colors"
                        >
                            <p className="font-semibold text-white">{skill.name}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Навыков пока нет</p>
                )}
            </div>
        </Container>
    );
};
