"use client"
import { FC, useEffect } from "react";
import { ProfileFullInfo } from "@/store/useProfileStore";
import useMembersStore from "@/store/useMembersStore";
import { Container } from "@/shared/components";
import useContactsStore from "@/store/useContactsStore";

const contactLabels: Record<string, string> = {
    PHONE: "Телефон",
    TELEGRAM: "Telegram",
    LINKEDIN: "LinkedIn",
    GITHUB: "GitHub",
    EMAIL: "Email",
    OTHER: "Другое"
};

import { useContactLink } from "@/hooks/useContactLink"; // <-- Импортируем хук

export const MemberContacts: FC<{ profile?: ProfileFullInfo }> = ({ profile }) => {
    const { currentMember } = useMembersStore();
    const { contacts, fetchContacts, isContactsLoading } = useContactsStore();
    const getContactLink = useContactLink(); // <-- Используем как хук

    const memberId = profile?.id ?? currentMember?.id;

    useEffect(() => {
        if (memberId) {
            fetchContacts(memberId);
        }
    }, [memberId, fetchContacts]);

    const mem = profile ?? currentMember;

    return (
        <Container className="p-5 mt-10">
            <div className="flex flex-col gap-3">
                {isContactsLoading && <p className="text-gray-500">Загрузка контактов...</p>}

                {!isContactsLoading && mem?.email && (
                    <div className="flex justify-between w-full border-b border-gray-200 pb-2">
                        <p className="font-medium">{contactLabels.EMAIL}</p>
                        <a href={getContactLink("EMAIL", mem.email)}
                           className="text-blue-500 hover:underline">
                            {mem.email}
                        </a>
                    </div>
                )}

                {!isContactsLoading && contacts.length > 0 ? (
                    contacts.map((item, index) => (
                        <div key={index} className="flex justify-between w-full border-b border-gray-200 pb-2">
                            <p className="font-medium">{contactLabels[item.type] || item.type}</p>
                            {["PHONE", "TELEGRAM", "LINKEDIN", "GITHUB", "EMAIL"].includes(item.type) ? (
                                <a href={getContactLink(item.type, item.value)}
                                   target="_blank"
                                   rel="noopener noreferrer"
                                   className="text-blue-500 hover:underline">
                                    {item.value}
                                </a>
                            ) : (
                                <p>{item.value}</p>
                            )}
                        </div>
                    ))
                ) : (
                    !isContactsLoading && <p className="text-gray-500">Контакты не найдены</p>
                )}
            </div>
        </Container>
    );
};
