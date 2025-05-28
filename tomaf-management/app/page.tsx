"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import Image from "next/image";

export default function HomePage() {
  const { data: session, status } = useSession();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") return; // Still loading

    if (status === "unauthenticated") {
      // User is not logged in, redirect to login
      router.push("/login");
      return;
    }

    if (session?.user) {
      // User is logged in, redirect based on role
      if (session.user.role === "admin") {
        router.push("/admin");
      } else {
        router.push("/Home");
      }
    }
  }, [session, status, router]);

  // Show loading screen while checking authentication
  if (status === "loading") {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
        <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
          <div className="mb-4">
            <Image
              src="/afmlogo.png"
              alt="AFM Logo"
              width={80}
              height={80}
              className="mx-auto"
              priority
            />
          </div>
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            Tomaf Church Portal
          </h1>
          <div className="flex items-center justify-center">
            <svg
              className="animate-spin h-8 w-8 text-blue-600"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
              ></path>
            </svg>
            <span className="ml-3 text-gray-600">Loading...</span>
          </div>
        </div>
      </div>
    );
  }

  // This will briefly show while redirecting
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white rounded-2xl shadow-xl p-8 text-center">
        <div className="mb-4">
          <Image
            src="/afmlogo.png"
            alt="AFM Logo"
            width={80}
            height={80}
            className="mx-auto"
            priority
          />
        </div>
        <h1 className="text-2xl font-bold text-gray-800 mb-4">
          Tomaf Church Portal
        </h1>
        <p className="text-gray-600">Redirecting...</p>
      </div>
    </div>
  );
}
