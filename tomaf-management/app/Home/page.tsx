"use client";
import Navbar from "./components/navbar";
import SearchUser from "./components/searchUser";
import MemberTable from "./components/memberTable";
import { useState } from "react";
import MobileBottomNav from "./components/bottomNav";

const HomePage = () => {
  const [search, setSearch] = useState("");
  const [filterBy, setFilterBy] = useState("name");
  const [minAge, setMinAge] = useState<number | null>(null);
  const [maxAge, setMaxAge] = useState<number | null>(null);
  return (
    <>
      <div className="bg-gray-950 w-full text-white min-h-screen pb-16">
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

        <MobileBottomNav />
      </div>
    </>
  );
};

export default HomePage;
