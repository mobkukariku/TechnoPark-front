"use client"
import {FC, useEffect} from "react";
import {CertificatesList, Container, SkillsList, WorkExperience, MemberContacts, MemberInfo} from "@/shared/components";
import useProfileStore from "@/store/useProfileStore";
import {Pencil} from "lucide-react";
import {ProfileChangeMainDialog} from "@/shared/components/profile/main/ProfileChangeMainDialog";
import Link from "next/link";

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
                        <MemberInfo member={profile} />
                        <ProfileChangeMainDialog className={"absolute"} />
                    </div>
                ) : <p>Загрузка...</p>}

                {profile ? (
                    <div className={"relative"}>
                        <MemberContacts profile={profile} />
                        <Link href={'/profile/contacts'}>
                            <Pencil  className={"absolute top-[-30px] right-0  cursor-pointer hover:text-[#2D7DFF] transition-colors"}/>
                        </Link>
                    </div>
                ) : <p>Загрузка...</p>}

                {profile ? (
                    <div className={"relative"}>
                        <WorkExperience id={profile.id}  />
                        <Link href={'/profile/work-exp'}>
                            <Pencil  className={"absolute top-[30px] right-0  cursor-pointer hover:text-[#2D7DFF] transition-colors"}/>
                        </Link>
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