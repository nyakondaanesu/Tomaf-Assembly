"use client";
import Link from "next/link";
import { Home, BarChart2, Users, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

const MobileBottomNav = () => {
  const pathname = usePathname()?.toLowerCase() || "";

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-gray-900 text-white border-t border-gray-700 md:hidden">
      <div className="flex justify-around items-center h-16">
        <Link
          href="/home"
          className={`flex flex-col items-center gap-1 ${
            pathname === "/home" ? "text-blue-500" : "text-gray-400"
          }`}
        >
          <Home size={22} />
          <span className="text-xs">Home</span>
        </Link>

        <Link
          href="/Graphs"
          className={`flex flex-col items-center gap-1 ${
            pathname === "/graphs" ? "text-blue-500" : "text-gray-400"
          }`}
        >
          <BarChart2 size={22} />
          <span className="text-xs">Graphs</span>
        </Link>

        <Link
          href="/departments"
          className={`flex flex-col items-center gap-1 ${
            pathname === "/departments" ? "text-blue-500" : "text-gray-400"
          }`}
        >
          <Users size={22} />
          <span className="text-xs">Departments</span>
        </Link>
        <Link
          href="/user-settings"
          className={`flex flex-col items-center gap-1 ${
            pathname === "/user-settings" ? "text-blue-500" : "text-gray-400"
          }`}
        >
          <Settings size={22} />
          <span className="text-xs">Settings</span>
        </Link>
      </div>
    </nav>
  );
};

export default MobileBottomNav;
