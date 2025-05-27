"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Users, ChevronDown } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuTrigger,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";

type Props = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  filterBy: string; // Optional fi
  setFilterBy: (field: string) => void; // Optional setter for filterBy
  minAge: number | null;
  maxAge: number | null; // Optional age filters\
  setMinAge: (value: number) => void;
  setMaxAge: (value: number) => void;
};

const SearchUser = ({
  value,
  onChange,
  filterBy,
  setFilterBy,
  minAge,
  maxAge,
  setMaxAge,
  setMinAge,
}: Props) => {
  return (
    <div className="md:flex w-full px-4 py-6 bg-slate-950 items-center justify-center space-x-4 space-y-4 md:space-y-0 md:space-x-6 md:justify-start">
      {/* Stats Card */}
      <div className="w-full max-w-md lg:max-w-xl bg-gray-900 text-white rounded-lg shadow p-5">
        <div className="flex items-center gap-3">
          <Users className="text-blue-500" size={24} />
          <h1 className="text-lg font-semibold">Total Members</h1>
        </div>
        <h4 className="text-2xl font-bold mt-2">2,543</h4>
      </div>

      {/* Search & Filter Section */}
      <div className="flex w-full space-x-2 md:max-w-sm lg:max-w-xs items-center">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
              variant="outline"
              className="bg-gray-800 text-white border-gray-700"
            >
              {filterBy.charAt(0).toUpperCase() + filterBy.slice(1)}
              <ChevronDown className="ml-2" size={16} />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="bg-gray-800 text-white border border-gray-700">
            {["name", "surname", "occupation", "age"].map((field) => (
              <DropdownMenuItem
                key={field}
                onSelect={() => setFilterBy(field)}
                className="hover:bg-blue-600 cursor-pointer"
              >
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        {filterBy === "age" ? (
          <div className="flex space-x-2">
            <Input
              type="number"
              placeholder="Min Age"
              value={minAge ?? ""}
              onChange={(e) => setMinAge(Number(e.target.value))}
              className="bg-gray-800 border border-gray-700 text-white placeholder-gray-400 w-24"
            />
            <Input
              type="number"
              placeholder="Max Age"
              value={maxAge ?? ""}
              onChange={(e) => setMaxAge(Number(e.target.value))}
              className="bg-gray-800 border border-gray-700 text-white placeholder-gray-400 w-24"
            />
          </div>
        ) : (
          <Input
            type="text"
            placeholder={`Search by ${filterBy}...`}
            value={value}
            onChange={onChange}
            className="flex-1 bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
          />
        )}
      </div>
    </div>
  );
};

export default SearchUser;
