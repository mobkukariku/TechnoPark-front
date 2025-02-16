import {Member} from "@/shared/components/admin/members/MembersTable";
import {create} from "zustand";
import {getMembersforAdmins, getMembersForUsers} from "@/api/api";

interface MembersState {
    membersForAdmin: Member[];
    membersForUsers: Member[];
    search: string;
    currentMember: Member | null;
    isLoading: boolean;
    setSearch: (search: string) => void;
    fetchingMembersForUsers: () => Promise<void>;
    fetchMembersforAdmins: () => Promise<void>;
}

const useMembersStore = create<MembersState>((set, get) => ({
    membersForAdmin: [],
    membersForUsers: [],
    currentMember: null,
    isLoading: false,
    search: "",
    setSearch: (search) => set({ search }),
    fetchingMembersForUsers: async () => {
        const { isLoading, search } = get();

        if (isLoading) return;

        set({isLoading: true});

        try{
            const members = await getMembersForUsers(search);
            set({membersForUsers: members});
        }catch(err){
            throw err;
        }finally{
            set({isLoading: false});
        }

    },
    fetchMembersforAdmins: async () => {
        const { isLoading, search } = get();

        if (isLoading) return;

        set({isLoading: true});

        try{
            const members = await getMembersforAdmins(search);
            set({membersForAdmin: members});
        }catch (error) {
            throw error;
        }finally {
            set({isLoading: false});
        }
    },
}))

export default useMembersStore;