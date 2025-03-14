"use client"
import {FC} from "react";
import {useParams} from "next/navigation";
import {CurrentMemberInfo, SkillsList, WorkExperience, CertificatesList, MemberContacts} from "@/shared/components";

const CurrentMemberPage:FC = () => {
    const params = useParams();
    const id: string | Array<string> | undefined = params.id;

    return (
        <div>
            <CurrentMemberInfo id={id} />
            <MemberContacts />
            <WorkExperience id={id}  />
            <SkillsList  />
            <CertificatesList />
        </div>
    )
}

export default CurrentMemberPage;