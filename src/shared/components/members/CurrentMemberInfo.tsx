"use client";
import { FC, useEffect } from "react";
import useMembersStore from "@/store/useMembersStore";
import { CertificatesList, Container, MemberContacts, SkillsList, WorkExperience } from "@/shared/components";
import { MemberInfo } from "@/shared/components/members/MemberInfo";
import {MemberSkeleton, MemberContactsSkeleton, WorkExperienceSkeleton} from "@/shared/components/members";

export const CurrentMemberInfo: FC<{ id: string | Array<string> | undefined }> = ({ id }) => {
    const { currentMember, fetchMemberById } = useMembersStore();

    useEffect(() => {
        fetchMemberById(id);
    }, [fetchMemberById, id]);


    return (
        <Container className="mt-[30px]">
            {currentMember ? (
                <MemberInfo member={currentMember} />
            ): <MemberSkeleton />}
            {
                currentMember ? (
                    <MemberContacts/>
                ): (
                    <MemberContactsSkeleton />
                )
            }
            {
                currentMember ? (
                    <WorkExperience id={currentMember.id} />
                ): (
                    <WorkExperienceSkeleton />
                )
            }
            <SkillsList />
            <CertificatesList />
        </Container>
    );
};
