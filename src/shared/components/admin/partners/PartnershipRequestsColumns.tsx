import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { PartnershipRequest } from "@/api/requestsApi";
import { Button } from "@/shared/ui/button";

export const PartnershipRequestsColumns = (
  handleShowModal: (attachments: PartnershipRequest["attachments"]) => void,
  handleShowDescription: (description: string) => void
): ColumnDef<PartnershipRequest>[] => [
  {
    accessorKey: "senderName",
    header: "Sender Name",
    cell: ({ row }) => <div>{row.original.senderName}</div>,
  },
  {
    accessorKey: "title",
    header: "Title",
    cell: ({ row }) => <div>{row.original.title}</div>,
  },
  {
    accessorKey: "description",
    header: "Description",
    cell: ({ row }) => (
      <div
        className="max-w-[200px] truncate cursor-pointer hover:underline"
        title="Click to view full description"
        onClick={() => handleShowDescription(row.original.description)}
      >
        {row.original.description}
      </div>
    ),
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.original.email}</div>,
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
    id: "attachments",
    header: "Attachments",
    cell: ({ row }) => (
      <Button onClick={() => handleShowModal(row.original.attachments)}>
        View Attachments
      </Button>
    ),
  },
];
