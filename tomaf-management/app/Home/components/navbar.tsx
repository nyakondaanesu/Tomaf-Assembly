const Navbar = () => {
  return (
    <>
      <div className="flex  border-b border-gray-700 items-center ">
        <img
          src="afmlogo.png"
          alt="afm logo"
          height={30}
          width={30}
          className="m-3"
        />
        <h1 className="navbar-brand text-xs font-semibold ">
          Tomaf Database Management
        </h1>
      </div>
    </>
  );
};

export default Navbar;
