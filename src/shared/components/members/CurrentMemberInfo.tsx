"use client"
import { FC, useEffect } from "react";
import useMembersStore from "@/store/useMembersStore";
import {CertificatesList, Container, MemberContacts, SkillsList, WorkExperience} from "@/shared/components";
import {MemberInfo} from "@/shared/components/members/MemberInfo";

export const CurrentMemberInfo: FC<{ id: string | Array<string> | undefined }> = ({ id }) => {
    const { currentMember, fetchMemberById } = useMembersStore();

    useEffect(() => {
        fetchMemberById(id);
    }, [fetchMemberById, id]);

    return (
        <Container className={"mt-[30px] "}>
            {currentMember ? <MemberInfo member={currentMember} /> : <p>Загрузка...</p>}
            {currentMember ? <MemberContacts />  : <p>Загрузка...</p>}
            {currentMember ? <WorkExperience id={id}  /> : <p>Загрузка...</p>}
            {currentMember ? <SkillsList /> : <p>Загрузка...</p>}
            {currentMember ? <CertificatesList /> : <p>Загрузка...</p>}
        </Container>
    );
};
