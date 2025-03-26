import {create} from "zustand";
import {getContactsById, patchContact} from "@/api/contactsApi";

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
    updateContacts: (id: string | undefined, updatedData: Partial<Contacts>) => Promise<void>;

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
    },
    updateContacts: async (id: string | undefined, updatedData: Partial<Contacts>) => {
        set({ isContactsLoading: true });

        try{
            await patchContact(id, updatedData) as Contacts;

            set((state) => ({
                contacts: state.contacts.map((dep) =>
                    dep.id === id ? { ...dep, ...(updatedData as Contacts) } : dep
                ),
            }));
        }catch(error) {
            console.error("Failed to update contacts:", error);
            throw error;
        }finally {
            set({ isContactsLoading: false });
        }

    }
}));

export default useContactsStore;