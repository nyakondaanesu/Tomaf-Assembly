"use client";
import Link from "next/link";
import { Home, BarChart2, Users, Settings } from "lucide-react";
import { usePathname } from "next/navigation";

const SideNav = () => {
  const pathname = usePathname()?.toLowerCase() || "";

  const navItems = [
    { href: "/Home", icon: <Home size={20} />, label: "Home" },
    { href: "/Graphs", icon: <BarChart2 size={20} />, label: "Graphs" },
    { href: "/departments", icon: <Users size={20} />, label: "Departments" },
    { href: "/user-settings", icon: <Settings size={20} />, label: "Settings" },
  ];

  return (
    <nav className="hidden md:flex flex-col bg-gray-900 text-white w-56 h-screen fixed left-0 top-0 border-r border-gray-800 py-6 px-4">
      <h2 className="text-xl font-bold mb-8 text-center">Dashboard</h2>
      <ul className="space-y-4">
        {navItems.map((item) => (
          <li key={item.href}>
            <Link
              href={item.href}
              className={`flex items-center gap-3 px-3 py-2 rounded-lg transition-colors ${
                pathname === item.href.toLowerCase()
                  ? "bg-blue-600 text-white"
                  : "text-gray-400 hover:bg-gray-800 hover:text-white"
              }`}
            >
              {item.icon}
              <span className="text-sm">{item.label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default SideNav;
