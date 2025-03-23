import { create } from "zustand";
import { createDepartment, getDepartments, updateDepartment } from "@/api/departmentApi";

export interface Department {
    id: string;
    name: string;
    headId?: string | null;
    parentDepartmentId?: string | null;
}

interface DepartmentStore {
    departments: Department[];
    isLoading: boolean;
    fetchDepartments: () => Promise<void>;
    createDepartment: (data: Department) => Promise<void>;
    updateDepartment: (id: string, data: Partial<Department>) => Promise<void>;
}

const useDepartmentStore = create<DepartmentStore>((set) => ({
    departments: [],
    isLoading: false,

    fetchDepartments: async () => {
        set({ isLoading: true });
        try {
            const data = await getDepartments();
            set({ departments: data as Department[] }); // Явно указываем, что это массив Department[]
        } catch (error) {
            console.error("Ошибка при загрузке департаментов:", error);
        } finally {
            set({ isLoading: false });
        }
    },

    createDepartment: async (data: Department) => {
        set({ isLoading: true });
        try {
            const newDepartment = await createDepartment(data);
            set((state) => ({
                departments: [...state.departments, newDepartment as Department], // Приводим к Department
            }));
        } catch (error) {
            console.error("Ошибка при создании департамента:", error);
        } finally {
            set({ isLoading: false });
        }
    },

    updateDepartment: async (id, updatedData) => {
        set({ isLoading: true });
        try {
            const updatedDepartment = await updateDepartment(id, updatedData);
            set((state) => ({
                departments: state.departments.map((dep) =>
                    dep.id === id ? { ...dep, ...(updatedDepartment as Department) } : dep
                ),
            }));
        } catch (error) {
            console.error("Ошибка при обновлении департамента:", error);
        } finally {
            set({ isLoading: false });
        }
    },
}));

export default useDepartmentStore;
