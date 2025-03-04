import {create} from "zustand";
import {getMembersForAdmins, getMembersForUsers} from "@/api/usersApi";


export type Member = {
    _id: string;
    name: string;
    email: string;
    role: string;
    isActive: boolean;
};


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
            const members: Member[] = await getMembersForUsers(search) as Member[];
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
            const members: Member[] = await getMembersForAdmins(search) as Member[];
            set({membersForAdmin: members});
        }catch (error) {
            throw error;
        }finally {
            set({isLoading: false});
        }
    },
}))

export default useMembersStore;