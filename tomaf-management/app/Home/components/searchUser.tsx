"use client";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Users, Search, Filter } from "lucide-react";

type props = {
  value: string;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const SearchUser = ({ value, onChange }: props) => {
  return (
    <div className="md:flex w-full px-4 py-6 bg-slate-950  items-center justify-center space-x-4 space-y-4 md:space-y-0 md:space-x-6 md:justify-start">
      {/* Stats Card */}
      <div className="w-full max-w-md lg:max-w-xl bg-gray-900 text-white rounded-lg shadow p-5">
        <div className="flex items-center gap-3">
          <Users className="text-blue-500" size={24} />
          <h1 className="text-lg font-semibold">Total Members</h1>
        </div>
        <h4 className="text-2xl font-bold mt-2">2,543</h4>
      </div>

      {/* Search & Filter Section */}
      <div className="flex w-full space-x-1 mt-6 flex space-y-2 md:space-y-6 md:max-w-sm lg:max-w-xs md:flex-col ">
        <Input
          type="text"
          placeholder="Search member..."
          value={value}
          onChange={onChange}
          className="flex-1 bg-gray-800 border border-gray-700 text-white placeholder-gray-400"
        />
        <div className="flex  space-x-1">
          <Button
            type="submit"
            className="bg-gray-800 hover:bg-blue-600 text-white"
          >
            <span className="hidden md:inline">Search</span>
            <Search size={18} />
          </Button>
          <Button
            type="button"
            className="bg-gray-800 hover:bg-blue-600 text-white"
          >
            <span className="hidden md:inline">Filter Members</span>
            <Filter size={18} />
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SearchUser;
