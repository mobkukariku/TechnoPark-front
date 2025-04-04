// JobRolesColumns.tsx
import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { JobRole } from "@/store/useJobRolesStore";

export const JobRolesColumns = (
  handleEdit: (role: JobRole) => void,
  handleDelete: (id: string) => void
): ColumnDef<JobRole>[] => [
  {
    accessorKey: "name",
    header: "Name",
    cell: ({ row }) => <div>{row.original.name}</div>,
  },
  {
    accessorKey: "isActive",
    header: "Active",
    cell: ({ row }) => (
      <div>{row.original.isActive ? "Active" : "Inactive"}</div>
    ),
  },
  {
    accessorKey: "createdAt",
    header: "Creation Date",
    cell: ({ row }) => {
      const date = new Date(row.original.createdAt);
      return <div>{date.toISOString().split("T")[0]}</div>;
    },
  },
  {
    id: "actions",
    header: "Actions",
    cell: ({ row }) => (
      <div className="flex gap-2">
        <button
          className="text-blue-600 hover:underline"
          onClick={() => handleEdit(row.original)}
        >
          Edit
        </button>
        <button
          className="text-red-600 hover:underline"
          onClick={() => handleDelete(row.original.id)}
        >
          Delete
        </button>
      </div>
    ),
  },
];
