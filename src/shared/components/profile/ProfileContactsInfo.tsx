"use client"
import {FC, useEffect} from "react";
import {CertificatesList, Container, SkillsList, WorkExperience} from "@/shared/components";
import {MemberContacts} from "@/shared/components/members";
import useProfileStore from "@/store/useProfileStore";
import {Pencil} from "lucide-react";

export const ProfileContactsInfo:FC = () => {

    const {profile, fetchProfile} = useProfileStore();

    useEffect(() => {
        fetchProfile()
    }, []);

    return (
        <div>
            <Container className={" mt-[30px]"}>
                {profile ? (
                    <div className={"relative"}>
                        <MemberContacts member={profile} />
                        <Pencil  className={"absolute top-[30px] right-0  cursor-pointer hover:text-[#2D7DFF] transition-colors"}/>
                    </div>
                ) : <p>Загрузка...</p>}

                {profile ? (
                    <div className={"relative"}>
                        <WorkExperience id={profile.id}  />
                        <Pencil  className={"absolute top-[30px] right-0  cursor-pointer hover:text-[#2D7DFF] transition-colors"}/>
                    </div>
                ) : <p>Загрузка...</p>}
                <div className={"relative"}>
                    <SkillsList />
                    <Pencil  className={"absolute top-[30px] right-0  cursor-pointer hover:text-[#2D7DFF] transition-colors"}/>
                </div>
                <div className={"relative"}>
                    <CertificatesList />
                    <Pencil  className={"absolute top-[30px] right-0  cursor-pointer hover:text-[#2D7DFF] transition-colors"}/>
                </div>
            </Container>
        </div>
    )
}