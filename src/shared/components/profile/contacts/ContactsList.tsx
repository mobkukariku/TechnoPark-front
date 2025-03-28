"use client"
import { FC, useEffect } from "react";
import { Container } from "@/shared/components/container/Container";
import useContactsStore from "@/store/useContactsStore";
import useProfileStore from "@/store/useProfileStore";
import {Button} from "@/shared/ui";
import {ContactLine} from "@/shared/components/profile/contacts/ContactLine";
import {ContactsAddDialog} from "@/shared/components/profile/contacts/ContactsAddDialog";

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
            <h1 className="text-2xl font-semibold mb-[20px]">Контакты</h1>
           <div className={"flex flex-col gap-[10px]"}>
               {contacts.length > 0 ? (
                   contacts.map((contact) => (
                       <ContactLine key={contact.id} id={contact.id} value={contact.value} type={contact.type}/>
                   ))
               ) : (
                   <p className="text-gray-500">Нет доступных контактов</p>
               )}
           </div>
            <div className={"w-full flex my-[20px] justify-center"}>
                <ContactsAddDialog />
            </div>
        </Container>
    );
};
