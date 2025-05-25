import Navbar from "./components/navbar";
import SearchUser from "./components/searchUser";
import MemberTable from "./components/memberTable";

const page = () => {
  return (
    <>
      <div className="bg-gray-950 w-full text-white h-max ">
        <Navbar />
        <SearchUser />
        <MemberTable />
      </div>
    </>
  );
};

export default page;
