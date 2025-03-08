import { FC } from "react";
import { Container } from "@/shared/components";
import useMembersStore from "@/store/useMembersStore";
import useProfileStore from "@/store/useProfileStore";

interface SkillsListProps {
    memberProfile?: { skills?: string[] };
}

export const SkillsList: FC<SkillsListProps> = ({ memberProfile }) => {
    const { currentMember } = useMembersStore();
    const { profile } = useProfileStore();

    // Определяем, откуда брать данные
    const skills = memberProfile?.skills ?? currentMember?.memberProfile?.skills ?? profile?.memberProfile?.skills ?? [];

    return (
        <Container className="mt-[70px] p-[20px]">
            <p className="text-[20px] font-semibold">Навыки</p>
            <div className="flex mx-auto gap-[10px] flex-wrap mt-[20px]">
                {skills.length > 0 ? (
                    skills.map((skill, index) => (
                        <div key={index} className="bg-[#2D7DFF] px-[20px] py-[6px] rounded-[6px] hover:bg-[#0053DB] transition-colors">
                            <p className="font-semibold text-white">{skill}</p>
                        </div>
                    ))
                ) : (
                    <p className="text-gray-500">Навыков пока нет</p>
                )}
            </div>
        </Container>
    );
};
