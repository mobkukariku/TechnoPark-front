// JobRolesManager.tsx
"use client";

import React, { useEffect, useState } from "react";
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
} from "@tanstack/react-table";
import { Button, Input } from "@/shared/ui";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/shared/ui/table";
import useJobRolesStore, { JobRole } from "@/store/useJobRolesStore";
import { JobRolesColumns } from "./JobRolesColumns";

export function JobRolesManager() {
  const {
    jobRoles,
    isLoading,
    fetchJobRoles,
    createJobRole,
    updateJobRole,
    deleteJobRole,
  } = useJobRolesStore();

  // Local state for new role creation
  const [newRoleName, setNewRoleName] = useState("");

  // Local state for editing an existing role
  const [editingRole, setEditingRole] = useState<JobRole | null>(null);

  useEffect(() => {
    fetchJobRoles();
  }, [fetchJobRoles]);

  const handleCreate = async () => {
    if (newRoleName.trim()) {
      await createJobRole(newRoleName.trim());
      setNewRoleName("");
    }
  };

  const handleEdit = (role: JobRole) => {
    setEditingRole(role);
  };

  const handleUpdate = async () => {
    if (editingRole) {
      await updateJobRole(
        editingRole.id,
        editingRole.name,
        editingRole.isActive
      );
      setEditingRole(null);
    }
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this role?")) {
      await deleteJobRole(id);
    }
  };

  const columns = JobRolesColumns(handleEdit, handleDelete);

  const table = useReactTable({
    data: jobRoles,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div className="w-full p-4">
      <h2 className="mb-4 text-xl font-bold">Job Roles Manager</h2>

      {/* New Role Form */}
      <div className="mb-6 flex items-center gap-2">
        <Input
          value={newRoleName}
          onChange={(e) => setNewRoleName(e.target.value)}
          placeholder="Enter new role name"
          className="w-64"
        />
        <Button onClick={handleCreate}>Add Role</Button>
      </div>

      {/* Job Roles Table */}
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
                  <TableCell colSpan={4} className="text-center">
                    No roles available.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </div>
      )}

      {/* Edit Role Modal */}
      {editingRole && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="w-full max-w-md rounded-md bg-white p-6">
            <h3 className="mb-4 text-xl font-bold">Edit Role</h3>
            <Input
              value={editingRole.name}
              onChange={(e) =>
                setEditingRole({ ...editingRole, name: e.target.value })
              }
              placeholder="Role Name"
              className="mb-4 w-full"
            />
            <label className="mb-4 flex items-center gap-2">
              <input
                type="checkbox"
                checked={editingRole.isActive}
                onChange={(e) =>
                  setEditingRole({
                    ...editingRole,
                    isActive: e.target.checked,
                  })
                }
              />
              Active
            </label>
            <div className="flex justify-end gap-2">
              <Button variant="outline" onClick={() => setEditingRole(null)}>
                Cancel
              </Button>
              <Button onClick={handleUpdate}>Save</Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
