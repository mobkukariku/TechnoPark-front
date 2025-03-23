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

export function DepartmentsTable() {
    const { departments, fetchDepartments, updateDepartment} = useDepartmentStore();

    React.useEffect(() => {
        fetchDepartments();
    }, []);


    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [isEditing, setIsEditing] = React.useState(false);
    const [editedDepartments, setEditedDepartments] = React.useState<Record<string, Partial<Department>>>({});


    const handleChange = <K extends keyof Department>(
        id: string,
        key: K,
        value: Department[K]
    ) => {
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

    return (
        <div className="w-[98%]">
            <div className="flex items-center justify-between py-4">
                <Input
                    placeholder="Поиск"
                    className="max-w-sm"
                />
                <div className="flex gap-2">
                    <DepartmentCreateDialog />
                    {isEditing && (
                        <Button onClick={() => setIsEditing(false)} variant="outline">
                            Отмена
                        </Button>
                    )}
                    <Button onClick={isEditing ? saveChanges : () => setIsEditing(true)}>
                        {isEditing ? "Сохранить" : "Редактировать"}
                    </Button>
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
        </div>
    );
}
