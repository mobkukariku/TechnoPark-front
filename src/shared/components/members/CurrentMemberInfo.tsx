"use client"
import { FC, useEffect } from "react";
import useMembersStore from "@/store/useMembersStore";
import { Container } from "@/shared/components";
import {MemberContacts} from "@/shared/components/members/MemberContacts";

export const CurrentMemberInfo: FC<{ id: string | Array<string> | undefined }> = ({ id }) => {
    const { currentMember, fetchMemberById } = useMembersStore();

    useEffect(() => {
        fetchMemberById(id);
    }, []);

    return (
        <Container className={"mt-[30px]"}>
            {currentMember ? <MemberContacts member={currentMember} /> : <p>Загрузка...</p>}
        </Container>
    );
};
