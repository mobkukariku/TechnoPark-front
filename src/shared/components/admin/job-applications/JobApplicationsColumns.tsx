import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { JobApplication } from "@/api/requestsApi";

export const JobApplicationsColumns = (): ColumnDef<JobApplication>[] => [
  {
    accessorKey: "fullName",
    header: "Full Name",
    cell: ({ row }) => <div>{row.original.fullName}</div>,
  },
  {
    accessorKey: "email",
    header: "Email",
    cell: ({ row }) => <div>{row.original.email}</div>,
  },
  {
    accessorKey: "telegramUsername",
    header: "Telegram Username",
    cell: ({ row }) => <div>{row.original.telegramUsername}</div>,
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
    id: "cv",
    header: "CV",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        <a
          href={row.original.cvPath}
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 hover:underline"
        >
          {row.original.cvOriginalName}
        </a>
      </div>
    ),
  },
  {
    id: "coverLetter",
    header: "Cover Letter",
    cell: ({ row }) => (
      <div className="flex items-center gap-2">
        {row.original.coverLetterPath ? (
          <a
            href={row.original.coverLetterPath}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {row.original.coverLetterOriginalName}
          </a>
        ) : (
          <p>No</p>
        )}
      </div>
    ),
  },
];
