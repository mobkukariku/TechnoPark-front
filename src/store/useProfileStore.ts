import { create } from "zustand";
import {getProfile, logout} from "@/api/api";

interface ProfileData {
    name: string;
    email: string;
    surname: string;
    imageURL: string;
    role: string;
}

interface ProfileState {
    profile: ProfileData | null;
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
            const profile = await getProfile();
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
