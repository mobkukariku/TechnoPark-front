"use client"
import { FC, useEffect } from "react";
import { Container } from "@/shared/components/container/Container";
import useContactsStore from "@/store/useContactsStore";
import useProfileStore from "@/store/useProfileStore";

export const ContactsList: FC = () => {
    const { fetchContacts, contacts } = useContactsStore();
    const { fetchProfile, profile } = useProfileStore();

    useEffect(() => {
        fetchProfile();
    }, []);

    useEffect(() => {
        if (profile?.id) {
            fetchContacts(profile.id);
        }
    }, [profile]);

    return (
        <Container className="mt-8">
            <h1 className="text-2xl font-semibold">Контакты</h1>
            {contacts.length > 0 ? (
                contacts.map((contact) => (
                    <div key={contact.id} className="flex flex-col gap-2 border-b pb-2">
                        <p className="font-medium">{contact.type}</p>
                        <p className="text-gray-600">{contact.value}</p>
                    </div>
                ))
            ) : (
                <p className="text-gray-500">Нет доступных контактов</p>
            )}
        </Container>
    );
};
