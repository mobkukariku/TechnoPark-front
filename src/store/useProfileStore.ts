import { create } from "zustand";
import {getProfile, logout} from "@/api/authApi";

type ProfileData = {
    id: string;
    name: string;
    email: string;
}

export type ProfileFull = {
    skills?: string[];
    description?: string;
    imageURL?: string ;
    position?: string;
};


export type ProfileFullInfo = ProfileData & {
    memberProfile?: ProfileFull,
}




interface ProfileState {
    profile: ProfileFullInfo | null;
    isProfileLoading: boolean;
    setProfile: (profile: ProfileData) => void;
    getProfile: () => ProfileData | null;
    fetchProfile: () => Promise<void>;
    logout: () => void;
}

const useProfileStore = create<ProfileState>((set, get) => ({
    profile: null,
    isProfileLoading: false,
    setProfile: (profile: ProfileData) => set({ profile }),
    getProfile: () => get().profile,
    fetchProfile: async () => {
        set({ isProfileLoading: true });
        try {
            const profile:ProfileFullInfo = await getProfile() as ProfileFullInfo;
            set({ profile, isProfileLoading: false });
        } catch (error) {
            set({ isProfileLoading: false });
            console.error("Failed to fetch profile:", error);
        }
    },
    logout: async () => {
        set({ profile: null });
        window.location.href = "/";
        await logout();
    },
}));

export default useProfileStore;
