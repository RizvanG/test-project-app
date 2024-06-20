"use client";

import { useMemo, useState } from "react";
import {
  useReactTable,
  ColumnDef,
  getCoreRowModel,
  flexRender,
  getPaginationRowModel,
  getSortedRowModel,
  SortingState,
} from "@tanstack/react-table";
import {
  ArrowLeftIcon,
  ArrowRightIcon,
  ArrowUpIcon,
  ArrowDownIcon,
} from "@radix-ui/react-icons";
import { User } from "@/types/User";

interface UsersTableProps {
  users: User[];
}

export const UsersTable = ({ users }: UsersTableProps) => {
  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState({
    pageIndex: 0,
    pageSize: 10,
  });

  const memoUsers = useMemo(() => users, [users]);
  const tableColumns = useMemo<ColumnDef<User>[]>(
    () => [
      { header: "ID", accessorKey: "id", enableSorting: false },
      { header: "First Name", accessorKey: "firstName", enableSorting: false },
      { header: "Last Name", accessorKey: "lastName", enableSorting: false },
      {
        header: "Age",
        accessorKey: "age",
        enableSorting: true,
        cell: (info) => info.getValue(),
      },
      { header: "Gender", accessorKey: "gender", enableSorting: false },
      { header: "Eye Color", accessorKey: "eyeColor", enableSorting: false },
    ],
    []
  );

  const table = useReactTable({
    data: memoUsers,
    columns: tableColumns,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onPaginationChange: setPagination,
    onSortingChange: setSorting,
    autoResetPageIndex: false,
    state: {
      pagination,
      sorting,
    },
  });

  return (
    <>
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white">
          <thead>
            {table.getHeaderGroups().map((headerGroup) => (
              <tr key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <th
                    key={header.id}
                    className="py-2 px-4 text-left"
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    <div className="flex cursor-pointer select-none items-center">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                      {{
                        asc: <ArrowUpIcon />,
                        desc: <ArrowDownIcon />,
                      }[header.column.getIsSorted() as string] ?? null}
                    </div>
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody>
            {table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="py-2 px-4">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex justify-between items-center my-6">
        <button
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="bg-purple-600 text-white p-2 rounded-md cursor-pointer"
        >
          <ArrowLeftIcon />
        </button>
        <span className="ml-4">
          Page{" "}
          <strong>
            {table.getState().pagination.pageIndex + 1} of{" "}
            {table.getPageCount()}
          </strong>
        </span>
        <button
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="bg-purple-600 text-white p-2 rounded-md cursor-pointer"
        >
          <ArrowRightIcon />
        </button>
      </div>
    </>
  );
};
