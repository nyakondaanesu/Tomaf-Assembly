"use client";
import Navbar from "./components/navbar";
import SearchUser from "./components/searchUser";
import MemberTable from "./components/memberTable";
import { useState } from "react";

const page = () => {
  const [search, setSearch] = useState("");
  return (
    <>
      <div className="bg-gray-950 w-full text-white min-h-screen">
        <Navbar />
        <SearchUser
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <MemberTable
          searchQuery={search}
          minAge={1}
          maxAge={3}
          gender=""
          occupation=""
          maritalStatus=""
          departments={[]}
        />
      </div>
    </>
  );
};

export default page;
