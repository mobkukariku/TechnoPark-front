"use client";
import { ColumnDef } from "@tanstack/react-table";
import useDepartmentStore, { Department } from "@/store/useDepartmentStore";
import useMemberStore from "@/store/useMembersStore";
import { useEffect } from "react";
import { DepartmentSelect } from "@/shared/components/admin/departments/DepartmentSelect";
import { Checkbox } from "@/shared/ui";

export function DepartmentsColumns(
    isEditing: boolean,
    editedDepartments: Record<string, Partial<Department>>,
    handleChange: <K extends keyof Department>(id: string | undefined, key: K, value: Department[K]) => void
) {
    const { fetchDepartments, departments } = useDepartmentStore();
    const { fetchMembersforAdmins, membersForAdmin } = useMemberStore();

    useEffect(() => {
        if (departments.length === 0) fetchDepartments();
        if (membersForAdmin.length === 0) fetchMembersforAdmins();
    }, [departments.length, fetchDepartments, fetchMembersforAdmins, membersForAdmin.length]);

    const columns: ColumnDef<Department>[] = [
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
                    key={row.original.headId}
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
                    options={departments.map((dep) => ({ id: dep.id ?? "", name: dep.name }))}
                    onChange={(value) => handleChange(row.original.id, "parentDepartmentId", value)}
                    isEditing={isEditing}
                    placeholder="Выберите отдел"
                />
            ),
        },
    ];

    if (isEditing) {
        columns.unshift({
            id: "select",
            header: ({ table }) => (
                <Checkbox
                    checked={
                        table.getIsAllPageRowsSelected() ||
                        (table.getIsSomePageRowsSelected() && "indeterminate")
                    }
                    onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                    aria-label="Select all"
                />
            ),
            cell: ({ row }) => (
                <Checkbox
                    checked={row.getIsSelected()}
                    onCheckedChange={(value) => row.toggleSelected(!!value)}
                    aria-label="Select row"
                />
            ),
            enableSorting: false,
            enableHiding: false,
        });
    }

    return columns;
};
