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
import { FullMemberDetails } from "@/app/ttypes";
import MemberDetailsCard from "./MembersDetailsCard";

type MemberTableProps = {
  searchQuery: string;
  filterBy?: string;
  minAge: number | null;
  maxAge: number | null;
};

type MemberData = {
  id: number;
  name: string;
  surname: string;
  gender: string;
  dob?: string;
};

const MemberTable = ({
  searchQuery,
  filterBy,
  minAge,
  maxAge,
}: MemberTableProps) => {
  const [selectedRow, setSelectedRow] = useState<FullMemberDetails | null>(
    null
  );
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [data, setData] = useState<MemberData[]>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [loadingMembers, setLoadingMembers] = useState(true);
  const [loadingDetails, setLoadingDetails] = useState(false);

  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const touchStartPos = useRef<{ x: number; y: number } | null>(null);

  const handleTouchStart = (e: React.TouchEvent, memberId: number) => {
    // Debug: Log the member ID
    console.log("Touch start for member ID:", memberId);

    if (!memberId) {
      console.error("No member ID provided");
      return;
    }

    const touch = e.touches[0];
    touchStartPos.current = { x: touch.clientX, y: touch.clientY };

    timeoutRef.current = setTimeout(async () => {
      try {
        setLoadingDetails(true);
        console.log("Fetching details for member ID:", memberId);

        const res = await fetch(`/api/members/full?id=${memberId}`);
        if (!res.ok) {
          throw new Error(
            `Failed to fetch member details: ${res.status} ${res.statusText}`
          );
        }

        const result: FullMemberDetails = await res.json();
        console.log("Fetched member details:", result);

        setSelectedRow(result);
        setShowMobileMenu(true);

        // Add haptic feedback if available
        if (navigator.vibrate) {
          navigator.vibrate(50);
        }
      } catch (err) {
        console.error("Failed to fetch full details", err);
      } finally {
        setLoadingDetails(false);
      }
    }, 500);
  };

  const handleTouchEnd = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
    touchStartPos.current = null;
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!touchStartPos.current || !timeoutRef.current) return;

    const touch = e.touches[0];
    const deltaX = Math.abs(touch.clientX - touchStartPos.current.x);
    const deltaY = Math.abs(touch.clientY - touchStartPos.current.y);

    // Cancel if user moves finger too much (scrolling)
    if (deltaX > 10 || deltaY > 10) {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = null;
    }
  };

  const columns: ColumnDef<MemberData>[] = [
    {
      accessorKey: "name",
      header: "First Name",
      cell: ({ row }) => row.getValue("name") || "N/A",
    },
    {
      accessorKey: "surname",
      header: "Last Name",
      cell: ({ row }) => row.getValue("surname") || "N/A",
    },
    {
      accessorKey: "gender",
      header: "Gender",
      cell: ({ row }) => row.getValue("gender") || "N/A",
    },
    {
      accessorKey: "dob",
      header: "Age",
      cell: ({ row }) => {
        const dob = row.getValue("dob");
        if (!dob || typeof dob !== "string") return "N/A";
        const [year, month, day] = dob.split("-").map(Number);
        if (!year || !month || !day) return "N/A";
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        if (
          today.getMonth() < birthDate.getMonth() ||
          (today.getMonth() === birthDate.getMonth() &&
            today.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        return age.toString();
      },
      filterFn: (row, columnId, filterValue) => {
        const dob = row.getValue(columnId);
        if (!dob || typeof dob !== "string") return false;
        const [year, month, day] = dob.split("-").map(Number);
        const birthDate = new Date(year, month - 1, day);
        const today = new Date();
        let age = today.getFullYear() - birthDate.getFullYear();
        if (
          today.getMonth() < birthDate.getMonth() ||
          (today.getMonth() === birthDate.getMonth() &&
            today.getDate() < birthDate.getDate())
        ) {
          age--;
        }
        const min = filterValue?.min ?? -Infinity;
        const max = filterValue?.max ?? Infinity;
        return age >= min && age <= max;
      },
    },
    {
      id: "actions",
      header: () => <div className="hidden lg:block">Actions</div>,
      cell: ({ row }) => (
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
              <DropdownMenuItem
                onClick={async () => {
                  try {
                    setLoadingDetails(true);
                    const res = await fetch(
                      `/api/members/full?id=${row.original.id}`
                    );
                    if (!res.ok)
                      throw new Error("Failed to fetch member details");
                    const result: FullMemberDetails = await res.json();
                    setSelectedRow(result);
                    setShowMobileMenu(true);
                  } catch (err) {
                    console.error("Failed to fetch full details", err);
                  } finally {
                    setLoadingDetails(false);
                  }
                }}
              >
                More User Details
              </DropdownMenuItem>
              <DropdownMenuItem>Edit User Details</DropdownMenuItem>
              <DropdownMenuItem>Delete User Details</DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      ),
    },
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoadingMembers(true);
        const response = await fetch("/api/members");
        if (!response.ok) throw new Error("Failed to fetch members");
        const result: MemberData[] = await response.json();

        console.log("fetched members data:", result);
        console.log("first member", result[0]);

        setData(result);
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingMembers(false);
      }
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

  useEffect(() => {
    if (filterBy === "age") {
      table.getColumn("dob")?.setFilterValue({
        min: minAge ?? undefined,
        max: maxAge ?? undefined,
      });
    } else if (filterBy && typeof filterBy === "string") {
      table.getColumn(filterBy)?.setFilterValue(searchQuery);
    }
  }, [searchQuery, filterBy, minAge, maxAge, table]);

  // Cleanup timeout on unmount
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return (
    <>
      <div className="mx-3 md:mx-5 rounded-lg border border-gray-700 bg-[#111827] shadow-md">
        <div className="flex justify-between items-center p-4">
          <h1 className="text-md font-bold">Member List</h1>
          {loadingDetails && (
            <div className="text-sm text-gray-400">Loading details...</div>
          )}
        </div>
        <Table>
          <TableHeader className="bg-[#1f2937] text-gray-400 uppercase text-xs">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-gray-700"
              >
                {headerGroup.headers.map((header) => (
                  <TableHead
                    key={header.id}
                    className={`px-4 py-3 ${
                      header.column.id === "actions"
                        ? "hidden lg:table-cell"
                        : ""
                    }`}
                  >
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
            {loadingMembers ? (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  Loading...
                </TableCell>
              </TableRow>
            ) : table.getRowModel().rows.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  className="border-b border-gray-700 hover:bg-[#1e293b] transition select-none lg:select-auto"
                  onTouchStart={(e) => handleTouchStart(e, row.original.id)}
                  onTouchEnd={handleTouchEnd}
                  onTouchMove={handleTouchMove}
                  style={{ touchAction: "manipulation" }}
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
        </Table>
      </div>

      {selectedRow && showMobileMenu && (
        <MemberDetailsCard
          member={selectedRow}
          onClose={() => {
            setShowMobileMenu(false);
            setSelectedRow(null);
          }}
        />
      )}

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
