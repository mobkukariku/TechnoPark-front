import { create } from "zustand";
import {getMembersForAdmins, getMembersForUsers, getMemberById, patchMemberById} from "@/api/usersApi";

export type DepartmentMembership = {
    departmentId: string;
    role: string;
};

export type MemberProfile = {
    imageURL?: string;
    position?: string;
};

export type MemberProfileFull = {
    skills?: string[];
    description?: string;
    imageURL?: string;
    position?: string;
};

export type BaseMember = {
    id: string;
    name: string;
    email: string;
};

export type Contacts = {
    id: string;
    userId: string;
    type: string;
    value: string;
};

export type Member = BaseMember & {
    role: string;
    isActive: boolean;
    departmentMemberships?: DepartmentMembership[];
};

export type MemberRead = BaseMember & {
    memberProfile?: MemberProfile;
};

export type SelectedMember = BaseMember & {
    memberProfile?: MemberProfileFull;
};

interface MembersState {
    membersForAdmin: Member[];
    membersForUsers: MemberRead[];
    search: string;
    currentMember: SelectedMember | null;
    isLoading: boolean;
    setSearch: (search: string) => void;
    fetchingMembersForUsers: () => Promise<void>;
    fetchMembersforAdmins: () => Promise<void>;
    fetchMemberById: (id: string | Array<string> | undefined) => Promise<void>;
    updateMember: (id: string, updates: Partial<BaseMember & {
        role: string;
        isActive: boolean;
        departmentMemberships?: DepartmentMembership[]
    }>) => void;
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

        set({ isLoading: true });

        try {
            const members: MemberRead[] = (await getMembersForUsers(search)) as MemberRead[];
            set({ membersForUsers: members });
        } catch (err) {
            throw err;
        } finally {
            set({ isLoading: false });
        }
    },

    fetchMembersforAdmins: async () => {
        const { isLoading, search } = get();
        if (isLoading) return;

        set({ isLoading: true });

        try {
            const members: Member[] = (await getMembersForAdmins(search)) as Member[];
            set({ membersForAdmin: members });
        } catch (error) {
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    fetchMemberById: async (id: string | Array<string> | undefined) => {
        const { isLoading } = get();
        if (isLoading) return;

        set({ isLoading: true });

        try {
            const member: SelectedMember = (await getMemberById(id)) as SelectedMember;
            set({ currentMember: member });
        } catch (error) {
            throw error;
        } finally {
            set({ isLoading: false });
        }
    },

    updateMember: async (id: string, updates: Partial<Member>) => {
        try {
            await patchMemberById(id, updates); // Отправляем изменённые данные
            set((state) => ({
                membersForAdmin: state.membersForAdmin.map((member) =>
                    member.id === id ? { ...member, ...updates } : member
                ),
            }));
        } catch (error) {
            console.error("Failed to update member:", error);
        }
    },



}));

export default useMembersStore;
