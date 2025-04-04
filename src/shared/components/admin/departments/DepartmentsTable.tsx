"use client";

import * as React from "react";
import {
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
    flexRender,
} from "@tanstack/react-table";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/ui/table";
import { DepartmentsColumns } from "@/shared/components/admin/departments/DepartmentsColumns";
import useDepartmentStore, {Department} from "@/store/useDepartmentStore";
import {DepartmentCreateDialog} from "@/shared/components/admin/departments/DepartmentCreateDialog";
import {ConfirmDialog} from "@/shared/components";
import toast, {Toaster} from "react-hot-toast";

export function DepartmentsTable() {
    const { departments, fetchDepartments, updateDepartment, deleteDepartment} = useDepartmentStore();

    React.useEffect(() => {
        fetchDepartments();
    }, [fetchDepartments]);


    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [isEditing, setIsEditing] = React.useState(false);
    const [editedDepartments, setEditedDepartments] = React.useState<Record<string, Partial<Department>>>({});
    const [isDialogOpen, setIsDialogOpen] = React.useState(false);



    const handleChange = <K extends keyof Department>(
        id: string | undefined,
        key: K,
        value: Department[K]
    ) => {
        if (!id) return;
        setEditedDepartments((prev) => ({
            ...prev,
            [id]: { ...prev[id], [key]: value },
        }));
    };

    const saveChanges = async () => {
        for (const id in editedDepartments) {
            await updateDepartment(id, editedDepartments[id]);
        }
        setIsEditing(false);
        setEditedDepartments({});
    };

    const removeDepartment = async () => {
        const selectedRowIds = Object.keys(rowSelection);
        if (selectedRowIds.length > 0) {
            setIsDialogOpen(true);
        }else{
            toast.error("Выберите хотя бы один департамент.")
        }
    };

// Функция для подтверждения удаления
    const confirmRemoveDepartment = async () => {
        const selectedRowIds = table.getSelectedRowModel().rows.map((row) => row.original.id);

        if (selectedRowIds.length > 0) {
            for (const id of selectedRowIds) {
                await deleteDepartment(id || "");
            }
        } else {
            toast.error("Выберите хотя бы один департамент.");
        }
        setIsDialogOpen(false);
    };



    const table = useReactTable({
        data: departments,
        columns: DepartmentsColumns(isEditing, editedDepartments, handleChange),
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        onRowSelectionChange: setRowSelection,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
            rowSelection,
        },
    });
    const startEditing = () => {
        setEditedDepartments(Object.fromEntries(
            departments.map(dep => [dep.id, { ...dep }])
        ));
        setIsEditing(true);
    };

    const cancelEditing = () => {
        setEditedDepartments({});
        setIsEditing(false);
    };

    return (
        <div className="w-[98%]">
            <Toaster position="top-center" />
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Поиск"
                    className="max-w-sm"
                />
                <div className="flex gap-2">
                    {isEditing && (
                        <Button onClick={cancelEditing} variant="outline">
                            Отмена
                        </Button>
                    )}
                    {isEditing && (
                        <Button onClick={removeDepartment} variant="secondary">
                            Удалить
                        </Button>
                    )}

                    <Button onClick={isEditing ? saveChanges : startEditing}>
                        {isEditing ? "Сохранить" : "Редактировать"}
                    </Button>
                    <DepartmentCreateDialog />
                </div>
            </div>
            <div className="rounded-md border">
                <Table>
                    <TableHeader>
                        {table.getHeaderGroups().map((headerGroup) => (
                            <TableRow key={headerGroup.id}>
                                {headerGroup.headers.map((header) => (
                                    <TableHead key={header.id}>
                                        {header.isPlaceholder
                                            ? null
                                            : flexRender(header.column.columnDef.header, header.getContext())}
                                    </TableHead>
                                ))}
                            </TableRow>
                        ))}
                    </TableHeader>

                    <TableBody>
                        {table.getRowModel().rows.length ? (
                            table.getRowModel().rows.map((row) => (
                                <TableRow key={row.id}>
                                    {row.getVisibleCells().map((cell) => (
                                        <TableCell key={cell.id}>
                                            {flexRender(cell.column.columnDef.cell, cell.getContext())}
                                        </TableCell>
                                    ))}
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={3} className="h-24 text-center">
                                    Нет данных.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
            <ConfirmDialog
                text={"Вы уверены, что хотите удалить выбранные департаменты? Это действие необратимо."}
                onConfirm={confirmRemoveDepartment}
                isOpen={isDialogOpen}
                onClose={() => setIsDialogOpen(false)}
            />
        </div>
    );
}
