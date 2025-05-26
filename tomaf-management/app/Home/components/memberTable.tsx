"use client";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  useReactTable,
  getFilteredRowModel,
  getPaginationRowModel,
  ColumnFiltersState,
} from "@tanstack/react-table";

import { MoreHorizontal } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type Filters = {
  minAge?: number;
  maxAge?: number;
  departments: string[];
  gender?: string;
  maritalStatus?: string;
  occupation?: string;
};

type MemberTableProps = {
  searchQuery: string;
} & Filters;

const MemberTable = ({
  searchQuery,
  minAge,
  maxAge,
  departments,
  gender,
  maritalStatus,
  occupation,
}: MemberTableProps) => {
  type MemberData = {
    name: string;
    surname: string;
    gender: string;
    dob?: string; // ISO date string
  };

  const columns: ColumnDef<MemberData>[] = [
    {
      accessorKey: "name",
      header: "First Name",
      cell: ({ row }) => row.getValue("name"),
    },
    {
      accessorKey: "surname",
      header: "Last Name",
      cell: ({ row }) => row.getValue("surname"),
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => row.getValue("gender"),
    },

    {
      accessorKey: "dob",
      header: "Age",
      cell: ({ row }) => {
        const dob = row.getValue("dob");
        if (!dob || typeof dob !== "string") return "N/A";

        const [year, month, day] = dob.split("-").map(Number);
        if (!year || !month || !day) return "N/A";

        const birthDate = new Date(year, month - 1, day); // months are 0-indexed
        const today = new Date();

        let age = today.getFullYear() - birthDate.getFullYear();
        const hasHadBirthdayThisYear =
          today.getMonth() > birthDate.getMonth() ||
          (today.getMonth() === birthDate.getMonth() &&
            today.getDate() >= birthDate.getDate());

        if (!hasHadBirthdayThisYear) age--;

        return age.toString();
      },
    },

    {
      id: "actions",
      header: "Actions",
      cell: ({ row }) => (
        <>
          {/* Visible on large screens only */}
          <div className="hidden lg:flex space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="h-8 w-8 p-0">
                  <span className="sr-only">Open menu</span>
                  <MoreHorizontal className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More User Details</DropdownMenuItem>
                <DropdownMenuItem>Edit User Details</DropdownMenuItem>
                <DropdownMenuItem>Delete User Details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </>
      ),
    },
  ];

  const [selectedRow, setSelectedRow] = useState<MemberData | null>(null);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const timeoutRef = useRef<any>(null);
  const [data, setData] = useState<MemberData[]>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [filters, setFilters] = useState<Filters>({
    minAge: undefined,
    maxAge: undefined,
    gender: undefined,
    maritalStatus: undefined,
    occupation: undefined,
    departments: [],
  });

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/members");
      if (!response.ok) {
        throw new Error("Failed to fetch members");
      }
      const result: MemberData[] = await response.json();
      setData(result);
    };
    fetchData();
  }, []);

  const table = useReactTable({
    data,
    columns,
    state: {
      columnFilters,
    },
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleFilterChange = (newFilters: Filters) => {
    //
  };

  useEffect(() => {
    table.getColumn("name")?.setFilterValue(searchQuery);
  }, [searchQuery, table]);

  return (
    <>
      <div className="mx-3 md:mx-5 rounded-lg border border-gray-700 bg-[#111827] shadow-md">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-md font-bold">Member List</h1>
        </div>

        <Table className="mb-5">
          <TableHeader className="bg-[#1f2937] text-gray-400 uppercase text-xs">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-gray-700"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead key={header.id} className="px-4 py-3">
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
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                  className="border-b border-gray-700 hover:bg-[#1e293b] transition"
                  onTouchStart={() => {
                    timeoutRef.current = setTimeout(() => {
                      setSelectedRow(row.original);
                      setShowMobileMenu(true);
                    }, 500);
                  }}
                  onTouchEnd={() => clearTimeout(timeoutRef.current)}
                  onTouchMove={() => clearTimeout(timeoutRef.current)}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id} className="px-4 py-3">
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
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>

          {/* Mobile Action Dropdown */}
          {showMobileMenu && selectedRow && (
            <DropdownMenu open onOpenChange={(open) => setShowMobileMenu(open)}>
              <DropdownMenuContent className="z-50 fixed bottom-10 left-5 right-5">
                <DropdownMenuLabel>Actions</DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem>More User Details</DropdownMenuItem>
                <DropdownMenuItem>Edit User Details</DropdownMenuItem>
                <DropdownMenuItem>Delete User Details</DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </Table>
      </div>

      <div className="flex items-center justify-end space-x-2 me-5 py-4">
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.previousPage()}
          disabled={!table.getCanPreviousPage()}
          className="text-white bg-gray-800 hover:bg-gray-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          Previous
        </Button>
        <Button
          variant="outline"
          size="sm"
          onClick={() => table.nextPage()}
          disabled={!table.getCanNextPage()}
          className="text-white bg-gray-800 hover:bg-gray-700 disabled:bg-gray-600 disabled:cursor-not-allowed"
        >
          Next
        </Button>
      </div>
    </>
  );
};

export default MemberTable;
