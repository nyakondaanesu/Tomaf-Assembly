"use client";

import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react"; // optional icon
import Image from "next/image";

const Navbar = () => {
  const router = useRouter();

  return (
    <div className="flex justify-between items-center border-b border-gray-700 bg-[#111827] px-6 py-3 shadow-md">
      {/* Logo & Brand */}
      <div className="flex items-center space-x-3">
        <Image
          src="/afmlogo.png"
          alt="AFM Logo"
          className="h-8 w-8 object-contain"
        />
        <h1 className="text-sm font-semibold text-white tracking-wide">
          Tomaf Analytics
        </h1>
      </div>

      {/* Back Button */}
      <button
        onClick={() => router.push("/Home")}
        className="flex items-center space-x-2 bg-gray-800 text-white px-4 py-2 rounded-lg text-sm hover:bg-gray-700 transition duration-200"
      >
        <ArrowLeft size={16} />
        <span>Back to Home</span>
      </button>
    </div>
  );
};

export default Navbar;
