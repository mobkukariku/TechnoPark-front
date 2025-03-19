import {create} from "zustand";
import {getContactsById} from "@/api/contactsApi";

export type Contacts = {
    id: string;
    userId: string;
    type: string;
    value: string;
};


interface ContactsState {
    contacts: Contacts[];
    isContactsLoading: boolean;
    fetchContacts: (id: string | undefined) => Promise<void>;

}

const useContactsStore = create<ContactsState>((set, get) => ({
    contacts: [],
    isContactsLoading: false,
    fetchContacts: async (id: string | undefined) => {
        set({ isContactsLoading: true });
        try {
            const contacts:Contacts[] = await getContactsById(id) as Contacts[];
            set({ contacts, isContactsLoading: false });
        } catch (error) {
            set({ isContactsLoading: false });
            console.error("Failed to fetch contacts:", error);
        }
    }
}));

export default useContactsStore;