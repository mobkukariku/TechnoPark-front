import React from "react";
import { ColumnDef } from "@tanstack/react-table";
import { JobApplication } from "@/api/requestsApi";
import TruncatedText from "../TruncatedText";

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
    accessorKey: "jobRoleId",
    header: "Job Role ID",
    cell: ({ row }) => <div>{row.original.jobRoleId}</div>,
  },
  {
    accessorKey: "referralSource",
    header: "Referral Source",
    cell: ({ row }) => (
      <div>
        <TruncatedText text={row.original.referralSource} maxLength={30} />
      </div>
    ),
  },
  {
    accessorKey: "projectInterests",
    header: "Project Interests",
    cell: ({ row }) => (
      <div>
        <TruncatedText text={row.original.projectInterests} maxLength={30} />
      </div>
    ),
  },
  {
    accessorKey: "skills",
    header: "Skills",
    cell: ({ row }) => (
      <div>
        <TruncatedText text={row.original.skills} maxLength={30} />
      </div>
    ),
  },
  {
    accessorKey: "organizationInterest",
    header: "Organization Interest",
    cell: ({ row }) => (
      <div>
        <TruncatedText
          text={row.original.organizationInterest}
          maxLength={30}
        />
      </div>
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
    id: "cv",
    header: "CV",
    cell: ({ row }) => (
      <a href={row.original.cvPath} target="_blank" rel="noopener noreferrer">
        <div>{row.original.cvOriginalName}</div>
      </a>
    ),
  },
  {
    id: "coverLetter",
    header: "Cover Letter",
    cell: ({ row }) => (
      <div>
        {row.original.coverLetterPath ? (
          <a
            href={row.original.coverLetterPath}
            target="_blank"
            rel="noopener noreferrer"
          >
            {row.original.coverLetterOriginalName}
          </a>
        ) : (
          <div>No</div>
        )}
      </div>
    ),
  },
];
