"use client"

import { FC } from "react";
import useMembersStore from "@/store/useMembersStore";


import * as React from "react"
import {
    ColumnDef,
    ColumnFiltersState,
    SortingState,
    VisibilityState,
    flexRender,
    getCoreRowModel,
    getFilteredRowModel,
    getPaginationRowModel,
    getSortedRowModel,
    useReactTable,
} from "@tanstack/react-table"

import { Input } from "@/shared/ui/input"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/shared/ui/table"

export type Department = {
    _id: string;
    name: string;
}


export type Member = {
    _id: string;
    name: string;
    surname: string;
    email: string;
    position: string;
    phoneNumber: string;
    telegram: string;
    linkedinURL: string;
    departmentId: Department;
    isHead: boolean;
};





export const columns: ColumnDef<Member>[] = [
    {
        accessorKey: "name",
        header: "Name",
        cell: ({ row }) => <div>{row.original.name} {row.original.surname}</div>,
    },
    {
        accessorKey: "email",
        header: "Email",
        cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
    },
    {
        accessorKey: "position",
        header: "Position",
        cell: ({ row }) => <div>{row.getValue("position")}</div>,
    },
    {
        accessorKey: "phoneNumber",
        header: "Phone",
        cell: ({ row }) => <div>{row.getValue("phoneNumber")}</div>,
    },
    {
        accessorKey: "telegram",
        header: "Telegram",
        cell: ({ row }) => <div>{row.getValue("telegram")}</div>,
    },
    {
        accessorKey: "linkedinURL",
        header: "LinkedIn",
        cell: ({ row }) => (
            <a
                href={row.getValue("linkedinURL")}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-500 underline"
            >
                Profile
            </a>
        ),
    },
    {
        accessorKey: "department",
        header: "Department",
        cell: ({ row }) => <div>{row.original.departmentId?.name || "N/A"}</div>,
    },
];

export const MembersTable: FC = () => {
    const { isLoading, membersForAdmin, fetchMembersforAdmins, search, setSearch } = useMembersStore();

    const [sorting, setSorting] = React.useState<SortingState>([]);
    const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>([]);
    const [columnVisibility, setColumnVisibility] = React.useState<VisibilityState>({});




    React.useEffect(() => {
        if(!isLoading){
            fetchMembersforAdmins();
        }
    }, [search]);




    const table = useReactTable({
        data: membersForAdmin,
        columns,
        onSortingChange: setSorting,
        onColumnFiltersChange: setColumnFilters,
        getCoreRowModel: getCoreRowModel(),
        getPaginationRowModel: getPaginationRowModel(),
        getSortedRowModel: getSortedRowModel(),
        getFilteredRowModel: getFilteredRowModel(),
        onColumnVisibilityChange: setColumnVisibility,
        state: {
            sorting,
            columnFilters,
            columnVisibility,
        },
    });

    return (
        <div className="w-[99%]">
            <div className="flex items-center py-4">
                <Input
                    placeholder="Find"
                    value={search}
                    onChange={(event) =>
                        setSearch(event.target.value)
                }
                    className="max-w-sm"
                />
            </div>
            <div className="rounded-md border">
                {!isLoading ? (
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
                            {table.getRowModel().rows?.length ? (
                                table.getRowModel().rows.map((row) => (
                                    <TableRow key={row.id}>
                                        {row.getVisibleCells().map((cell) => (
                                            <TableCell key={cell.id}>{flexRender(cell.column.columnDef.cell, cell.getContext())}</TableCell>
                                        ))}
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan={columns.length} className="h-24 text-center">No results.</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                ): (
                    <div>Загрузка</div>
                )}
            </div>
        </div>
    );
};
