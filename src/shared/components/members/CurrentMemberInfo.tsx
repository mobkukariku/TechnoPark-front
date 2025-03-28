"use client"
import { FC, useEffect } from "react";
import useMembersStore from "@/store/useMembersStore";
import { Container } from "@/shared/components";
import {MemberInfo} from "@/shared/components/members/MemberInfo";

export const CurrentMemberInfo: FC<{ id: string | Array<string> | undefined }> = ({ id }) => {
    const { currentMember, fetchMemberById } = useMembersStore();

    useEffect(() => {
        fetchMemberById(id);
    }, []);

    return (
        <Container className={"mt-[30px] "}>
            {currentMember ? <MemberInfo member={currentMember} /> : <p>Загрузка...</p>}
        </Container>
    );
};
