"use client";
import { ColumnDef } from "@tanstack/react-table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import useDepartmentStore, { Department } from "@/store/useDepartmentStore";
import useMemberStore from "@/store/useMembersStore";
import { useEffect } from "react";

export const DepartmentsColumns = (
    isEditing: boolean,
    editedDepartments: Record<string, Partial<Department>>,
    handleChange: <K extends keyof Department>(id: string, key: K, value: Department[K]) => void
): ColumnDef<Department>[] => {
    const { fetchDepartments, departments } = useDepartmentStore();
    const { fetchMembersforAdmins, membersForAdmin } = useMemberStore();

    useEffect(() => {
        if (departments.length === 0) fetchDepartments();
        if (membersForAdmin.length === 0) fetchMembersforAdmins();
    }, []);

    return [
        {
            accessorKey: "name",
            header: "Название",
            cell: ({ row }) => row.original.name,
        },
        {
            accessorKey: "headId",
            header: "Руководитель",
            cell: ({ row }) => (
                <DepartmentSelect
                    value={row.original.headId || ""}
                    options={membersForAdmin}
                    onChange={(value) => handleChange(row.original.id, "headId", value)}
                    isEditing={isEditing}
                    placeholder="Выберите руководителя"
                />
            ),
        },
        {
            accessorKey: "parentDepartmentId",
            header: "Родительский отдел",
            cell: ({ row }) => (
                <DepartmentSelect
                    value={row.original.parentDepartmentId || ""}
                    options={departments}
                    onChange={(value) => handleChange(row.original.id, "parentDepartmentId", value)}
                    isEditing={isEditing}
                    placeholder="Выберите отдел"
                />
            ),
        },
    ];
};

interface Option {
    id: string;
    name: string;
}

const DepartmentSelect = ({
                              value,
                              options,
                              onChange,
                              isEditing,
                              placeholder,
                          }: {
    value: string;
    options: Option[];
    onChange: (value: string) => void;
    isEditing: boolean;
    placeholder: string;
}) => {
    return isEditing ? (
        <Select value={value} onValueChange={onChange}>
            <SelectTrigger>
                <SelectValue>{options.find((opt) => opt.id === value)?.name || placeholder}</SelectValue>
            </SelectTrigger>
            <SelectContent>
                {options.map((opt) => (
                    <SelectItem key={opt.id} value={opt.id}>
                        {opt.name}
                    </SelectItem>
                ))}
            </SelectContent>
        </Select>
    ) : (
        options.find((opt) => opt.id === value)?.name || "—"
    );
};
