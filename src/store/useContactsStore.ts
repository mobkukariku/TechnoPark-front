import {create} from "zustand";
import {addContact, deleteContact, getContactsById, patchContact} from "@/api/contactsApi";

export type Contacts = {
    id?: string;
    userId: string;
    type: string;
    value: string;
};


interface ContactsState {
    contacts: Contacts[];
    isContactsLoading: boolean;
    fetchContacts: (id: string | undefined) => Promise<void>;
    updateContacts: (id: string | undefined, updatedData: Partial<Contacts>) => Promise<void>;
    addContact: (contact: Contacts) => Promise<void>;
    deleteContact: (id: string | undefined) => Promise<void>;

}

const useContactsStore = create<ContactsState>((set,) => ({
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
    },
    addContact: async (contact: Contacts) => {
        set({ isContactsLoading: true });

        try {
            const newContact: Contacts = await addContact(contact) as Contacts;

            set((state) => ({
                contacts: [...state.contacts, newContact], // Добавляем новый контакт в список
            }));
        } catch (error) {
            console.error("Failed to add contact:", error);
            throw error;
        } finally {
            set({ isContactsLoading: false });
        }
    },
    deleteContact: async (id: string | undefined) => {
        set({ isContactsLoading: true });

        try {
            await deleteContact(id) as Contacts;

            set((state) => ({
                contacts: state.contacts.filter((dep) => dep.id !== id),
            }));
        } catch (error) {
            console.error("Failed to delete contact:", error);
            throw error;
        } finally {
            set({ isContactsLoading: false });
    }
}}));

export default useContactsStore;