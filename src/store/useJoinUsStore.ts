import { create } from 'zustand';
import {postRequest} from "@/api/api";

interface FormData {
    firstName: string;
    lastName: string;
    email: string;
    phone: string;
    address: string;
}

interface FormState {
    formData: FormData;
    setFormData: (data: Partial<FormData>) => void;
    submitForm: () => Promise<void>;
    isSubmitting: boolean;
}

const useFormStore = create<FormState>((set, get) => ({
    formData: {
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        address: ''
    },
    setFormData: (data) => set((state) => ({ formData: { ...state.formData, ...data } })),
    isSubmitting: false,
    submitForm: async () => {
        set({ isSubmitting: true });
        const { firstName, lastName, email, phone, address } = get().formData;
        try {
            await postRequest(firstName, lastName, email, phone, address);
            console.log('Форма успешно отправлена');
        } catch (error) {
            console.error('Ошибка отправки формы', error);
        } finally {
            set({ isSubmitting: false });
        }
    }
}));

export default useFormStore;
