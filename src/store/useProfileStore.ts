import { create } from "zustand";
import { logout } from "@/api/authApi";
import { getProfile, updateProfile as updateProfileApi } from "@/api/profileApi";

type ProfileData = {
    id: string;
    name: string;
    email: string;
};

export type ProfileFull = {
    skills?: string[];
    description?: string;
    imageURL?: string;
    position?: string;
};

export type ProfileFullInfo = ProfileData & {
    memberProfile?: ProfileFull;
};

interface ProfileState {
    profile: ProfileFullInfo | null;
    isProfileLoading: boolean;
    setProfile: (profile: ProfileData) => void;
    getProfile: () => ProfileData | null;
    fetchProfile: () => Promise<void>;
    updateProfile: (id: string, updatedData: FormData) => Promise<void>;
    logout: () => void;
}

const useProfileStore = create<ProfileState>((set, get) => ({
    profile: null,
    isProfileLoading: false,

    setProfile: (profile: ProfileData) => {
        set({ profile });
        localStorage.setItem("isAuthenticated", "true");
    },

    getProfile: () => get().profile,

    fetchProfile: async () => {
        set({ isProfileLoading: true });
        try {
            const profile: ProfileFullInfo = await getProfile() as ProfileFullInfo;
            set({ profile, isProfileLoading: false });
            localStorage.setItem("isAuthenticated", "true");
        } catch (error) {
            set({ isProfileLoading: false });
            console.error("Failed to fetch profile:", error);
        }
    },

    updateProfile: async (id: string, formData: FormData) => {
        try {
            const updatedProfile: ProfileFullInfo = await updateProfileApi(id, formData) as ProfileFullInfo;
            set({ profile: { ...get().profile, ...updatedProfile } });
        } catch (error) {
            console.error("Ошибка при обновлении профиля:", error);
        }
    },

    logout: async () => {
        set({ profile: null });
        localStorage.removeItem("isAuthenticated");
        window.location.href = "/";
        await logout();
    },
}));

export default useProfileStore;
