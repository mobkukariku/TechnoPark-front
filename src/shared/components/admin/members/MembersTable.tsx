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
    flexRender
} from "@tanstack/react-table";
import { Button } from "@/shared/ui/button";
import { Input } from "@/shared/ui/input";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/shared/ui/table";
import useMembersStore from "@/store/useMembersStore";
import { MembersColumns } from "@/shared/components/admin/members/MembersColumns";
import { Member } from "@/store/useMembersStore";

export function MembersTable() {
    const { isLoading, membersForAdmin, fetchMembersforAdmins, search, setSearch, updateMember } = useMembersStore();

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});
    const [rowSelection, setRowSelection] = React.useState({});
    const [isEditing, setIsEditing] = React.useState(false);
    const [editedMembers, setEditedMembers] = React.useState<Record<string, Partial<Member>>>({});

    React.useEffect(() => {
        if (!isLoading) {
            fetchMembersforAdmins();
        }
    }, [search]);


    const handleChange = <K extends keyof Member>(id: string, key: K, value: Member[K]) => {
        setEditedMembers((prev) => ({
            ...prev,
            [id]: { ...prev[id], [key]: value },
        }));
    };

    // Сохранение всех изменений
    const saveChanges = async () => {
        for (const id in editedMembers) {
            await updateMember(id, editedMembers[id]);
        }
        setIsEditing(false);
        setEditedMembers({});
    };

    const table = useReactTable({
        data: membersForAdmin,
        columns: MembersColumns(isEditing, editedMembers, handleChange),
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
                <Input placeholder="Find" value={search} onChange={(event) => setSearch(event.target.value)} className="max-w-sm" />
                <div className="flex gap-2">
                    {isEditing && (
                        <Button
                            onClick={() => {
                                setIsEditing(false);
                                setEditedMembers({});
                            }}
                            variant="outline"
                        >
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
                                        {header.isPlaceholder ? null : flexRender(header.column.columnDef.header, header.getContext())}
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
                                <TableCell colSpan={5} className="h-24 text-center">
                                    No results.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </div>
    );
}
