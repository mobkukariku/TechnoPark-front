import { ArrowUpDown, MoreHorizontal } from "lucide-react";
import { ColumnDef } from "@tanstack/react-table";
import { Button } from "@/shared/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "@/shared/ui/dropdown-menu";
import Link from "next/link";
import { Member } from "@/store/useMembersStore";

export function MembersColumns(
    isEditing: boolean,
    editedMembers: Record<string, Partial<Member>>,
    handleChange: <K extends keyof Member>(id: string, key: K, value: Member[K]) => void
): ColumnDef<Member>[] {
    return [
        {
            accessorKey: "userId",
            header: "ID",
            cell: ({ row }) => <div>{row.original.id}</div>,
        },
        {
            accessorKey: "name",
            header: "Name",
            cell: ({ row }) => <div>{row.original.name}</div>,
        },
        {
            accessorKey: "email",
            header: ({ column }) => (
                <Button variant="ghost" onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}>
                    Email
                    <ArrowUpDown />
                </Button>
            ),
            cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
        },
        {
            accessorKey: "role",
            header: "Role",
            cell: ({ row }) => {
                const member = row.original;
                const currentRole = editedMembers[member.id]?.role ?? member.role;

                if (member.role === "admin") {
                    return <span >Admin</span>;
                }

                return isEditing ? (
                    <Select value={currentRole} onValueChange={(value) => handleChange(member.id, "role", value)}>
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder={currentRole} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="member">Member</SelectItem>
                            <SelectItem value="manager">Manager</SelectItem>
                        </SelectContent>
                    </Select>
                ) : (
                    <span>{currentRole}</span>
                );
            },
        },
        {
            accessorKey: "isActive",
            header: "Status",
            cell: ({ row }) => {
                const member = row.original;
                const currentStatus = editedMembers[member.id]?.isActive ?? member.isActive;

                return isEditing ? (
                    <Select
                        value={currentStatus ? "true" : "false"}
                        onValueChange={(value) => handleChange(member.id, "isActive", value === "true")}
                    >
                        <SelectTrigger className="w-[120px]">
                            <SelectValue placeholder={currentStatus ? "Работает" : "Не работает"} />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="true">Работает</SelectItem>
                            <SelectItem value="false">Не работает</SelectItem>
                        </SelectContent>
                    </Select>
                ) : (
                    <span>{currentStatus ? "Работает" : "Не работает"}</span>
                );
            },
        },
        {
            id: "actions",
            enableHiding: false,
            cell: ({ row }) => {
                const member = row.original;
                return (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0">
                                <span className="sr-only">Open menu</span>
                                <MoreHorizontal />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="rounded-[8px]">
                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(member.id)}>Copy name</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => navigator.clipboard.writeText(member.email)}>Copy Email</DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem>
                                <Link href={`/members/${member.id}`}>View Profile</Link>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                );
            },
        },
    ];
}
