import "./globals.css";
import { Providers } from "./providers";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]/authoptions";

import SideNav from "./sideNav";
import MobileBottomNav from "./Home/components/bottomNav";
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "AFM Member System",
  description: "Church member and department management app",
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await getServerSession(authOptions);

  return (
    <html lang="en" className="dark">
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased bg-gray-950 text-white`}
      >
        <Providers>
          <div className="flex">
            {/* Show sidebar on medium+ if logged in */}
            {session && (
              <aside className="hidden md:block w-56 fixed h-full border-r border-gray-800 bg-gray-900">
                <SideNav />
              </aside>
            )}

            {/* Main content area */}
            <main className={`flex-1 ${session ? "md:ml-56" : ""} pb-16`}>
              {children}
            </main>

            {/* Mobile bottom nav - only if logged in */}
            {session && <MobileBottomNav />}
          </div>
        </Providers>
      </body>
    </html>
  );
}
