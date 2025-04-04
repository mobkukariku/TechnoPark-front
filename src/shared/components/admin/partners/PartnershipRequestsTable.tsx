"use client";

import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Button } from "@/shared/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import usePartnershipRequestsStore from "@/store/usePartnershipRequestsStore";
import { PartnershipRequestsColumns } from "./PartnershipRequestsColumns";
import { Attachment } from "@/api/requestsApi";

export function PartnershipRequestsTable() {
  const { requests, isLoading, fetchRequests } = usePartnershipRequestsStore();
  const [isAttachmentsModalOpen, setIsAttachmentsModalOpen] = useState(false);
  const [modalAttachments, setModalAttachments] = useState<Attachment[]>([]);

  // New state for description modal
  const [isDescriptionModalOpen, setIsDescriptionModalOpen] = useState(false);
  const [modalDescription, setModalDescription] = useState<string>("");

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  const handleShowModal = (attachments: Attachment[]) => {
    setModalAttachments(attachments);
    setIsAttachmentsModalOpen(true);
  };

  // Callback to show the full description modal
  const handleShowDescription = (description: string) => {
    setModalDescription(description);
    setIsDescriptionModalOpen(true);
  };

  // Pass both callbacks into the columns configuration
  const columns = PartnershipRequestsColumns(
    handleShowModal,
    handleShowDescription
  );

  const table = useReactTable({
    data: requests,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full">
      <h2 className="mb-4 text-lg font-bold">Partnership Requests</h2>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
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
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell colSpan={6} className="h-24 text-center">
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Attachments Modal */}
      {isAttachmentsModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-lg rounded-md bg-white p-4">
            <h3 className="mb-4 text-lg font-bold">Attachments</h3>

            {modalAttachments.length > 0 ? (
              <ul className="space-y-4 max-h-[50vh] overflow-y-auto">
                {modalAttachments.map((att) => (
                  <li
                    key={att.id}
                    className="flex items-center justify-between border-b pb-2"
                  >
                    {/* Left side: icon + filename */}
                    <div className="flex items-center gap-3">
                      {/* File icon (example: using lucide-react or any icon library) */}
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gray-200">
                        {/* Replace with any file icon you prefer, e.g. <FileTextIcon /> */}
                        <svg
                          className="h-4 w-4 text-gray-500"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth={1.5}
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M9 8.25V5.25a2.25 2.25 0 012.25-2.25h3.75L21 8.25v10.5A2.25 2.25 0 0118.75 21H5.25A2.25 2.25 0 013 18.75v-12A2.25 2.25 0 015.25 4.5h3.75"
                          />
                        </svg>
                      </div>
                      <span className="font-medium">{att.originalName}</span>
                    </div>

                    {/* Right side: actions (Open, Download) */}
                    <div className="flex gap-3">
                      {/* 'Open' link opens in a new tab */}
                      <a
                        href={att.path}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-blue-600 hover:underline"
                      >
                        Open
                      </a>
                    </div>
                  </li>
                ))}
              </ul>
            ) : (
              <div>No attachments available.</div>
            )}

            <div className="mt-4 flex justify-end">
              <Button onClick={() => setIsAttachmentsModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}

      {/* Description Modal */}
      {isDescriptionModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-3xl">
            <div className="bg-white rounded-md p-6 max-h-[80vh] overflow-y-auto overflow-x-hidden">
              <h3 className="mb-4 text-2xl font-bold">Full Description</h3>
              <p className="mb-6 break-words whitespace-pre-wrap">
                {modalDescription}
              </p>
              <Button onClick={() => setIsDescriptionModalOpen(false)}>
                Close
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
