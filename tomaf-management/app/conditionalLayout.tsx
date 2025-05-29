"use client";

import { usePathname } from "next/navigation";
import { useSession } from "next-auth/react";
import SideNav from "./sideNav";
import MobileBottomNav from "./Home/components/bottomNav";

type ConditionalLayoutProps = {
  children: React.ReactNode;
};

const ConditionalLayout = ({ children }: ConditionalLayoutProps) => {
  const pathname = usePathname();
  const { data: session } = useSession();

  const isLoginPage = pathname === "/login" || pathname === "/auth/signin";
  const showNavs = session && !isLoginPage;

  return (
    <div className="flex">
      {/* Sidebar for medium+ screens */}
      {showNavs && (
        <aside className="hidden md:block w-56 fixed h-full border-r border-gray-800 bg-gray-900">
          <SideNav />
        </aside>
      )}

      {/* Main content area */}
      <main className={`flex-1 ${showNavs ? "md:ml-56" : ""} pb-16`}>
        {children}
      </main>

      {/* Mobile bottom nav */}
      {showNavs && <MobileBottomNav />}
    </div>
  );
};

export default ConditionalLayout;
