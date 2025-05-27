"use client";
import Navbar from "./components/navbar";
import SearchUser from "./components/searchUser";
import MemberTable from "./components/memberTable";
import { useState } from "react";

const page = () => {
  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState("name");
  const [minAge, setMinAge] = useState(0);
  const [maxAge, setMaxAge] = useState(120);
  return (
    <>
      <div className="bg-gray-950 w-full text-white min-h-screen">
        <Navbar />
        <SearchUser
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          filterBy={filterBy}
          setFilterBy={setFilterBy}
          minAge={minAge}
          setMinAge={setMinAge}
          maxAge={maxAge}
          setMaxAge={setMaxAge}
        />
        <MemberTable
          searchQuery={search}
          filterBy={filterBy}
          minAge={minAge}
          maxAge={maxAge}
        />
      </div>
    </>
  );
};

export default page;
