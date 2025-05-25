"use client";
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
} from "@tanstack/react-table";
import { useEffect, useState } from "react";
const MemberTable = () => {
  type MemberData = {
    id: number;
    name: string;
    surname: string;
  };

  const colunms: ColumnDef<MemberData>[] = [
    {
      accessorKey: "id",
      header: "First Name",
      cell: ({ row }) => row.getValue("id"),
    },
    {
      accessorKey: "name",
      header: "Last Name",
      cell: ({ row }) => row.getValue("name"),
    },
    {
      accessorKey: "surname",
      header: "Phone Number",
      cell: ({ row }) => row.getValue("surname"),
    },
  ];

  const [data, setData] = useState<MemberData[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await fetch("/api/members");
      console.log("Response:", response);
      if (!response.ok) {
        throw new Error("Failed to fetch members");
      }
      const result: MemberData[] = await response.json();
      setData(result);
      console.log("Fetched Data:", result);
    };
    fetchData();
  }, []);

  const table = useReactTable({
    data,
    columns: colunms,
    getCoreRowModel: getCoreRowModel(),
  });
  return (
    <>
      <div className=" rounded-lg border border-gray-700 bg-[#111827] shadow-md">
        <Table>
          <TableHeader className="bg-[#1f2937] text-gray-400 uppercase text-xs">
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow
                key={headerGroup.id}
                className="border-b border-gray-700"
              >
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id} className="px-4 py-3">
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
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
                  colSpan={colunms.length}
                  className="h-24 text-center"
                >
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </>
  );
};

export default MemberTable;
