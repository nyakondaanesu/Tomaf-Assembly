"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Image from "next/image";
import { ArrowLeft } from "lucide-react";

interface Member {
  id: number;
  name: string;
  surname: string;
  phone: string;
  gender: string;
}

interface Department {
  id: number;
  name: string;
  members: Member[];
}

export default function DepartmentsPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [departments, setDepartments] = useState<Department[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedDepartment, setSelectedDepartment] = useState<string>("all");

  useEffect(() => {
    if (status === "loading") return;
    if (status === "unauthenticated") {
      router.push("/login");
      return;
    }
    fetchDepartments();
  }, [status]);

  const fetchDepartments = async () => {
    try {
      const res = await fetch("/api/departments");
      if (!res.ok) throw new Error("Failed to fetch departments");
      const data = await res.json();
      setDepartments(data);
    } catch (err) {
      setError(`got error ${err}`);
    } finally {
      setLoading(false);
    }
  };

  const filteredDepartments = departments.filter((dept) => {
    const matchesDepartment =
      selectedDepartment === "all" || dept.id.toString() === selectedDepartment;
    const matchesSearch =
      searchTerm === "" ||
      dept.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      dept.members.some((m) =>
        `${m.name} ${m.surname}`
          .toLowerCase()
          .includes(searchTerm.toLowerCase())
      );
    return matchesDepartment && matchesSearch;
  });

  if (loading || status === "loading") {
    return (
      <div className="min-h-screen bg-gray-900 text-white flex items-center justify-center">
        <div className="animate-spin h-8 w-8 text-blue-500">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            className="w-8 h-8"
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
              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
            ></path>
          </svg>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <div className="bg-gray-800 border-b border-gray-700 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <button
              onClick={() => router.back()}
              className="text-gray-300 hover:text-white flex items-center gap-1"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            <Image src="/afmlogo.png" alt="Logo" width={32} height={32} />
            <h1 className="text-lg font-bold text-white">Departments</h1>
          </div>
          <span className="text-sm text-gray-400 hidden md:inline">
            Welcome, {session?.user?.name || "User"}
          </span>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {error && (
          <div className="bg-red-900 text-red-300 border border-red-600 p-4 mb-6 rounded-md">
            {error}
          </div>
        )}

        {/* Filters */}
        <div className="bg-gray-800 p-6 rounded-xl shadow mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium mb-2">
                Search Members or Departments
              </label>
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                placeholder="Search by name or department..."
              />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">
                Filter by Department
              </label>
              <select
                value={selectedDepartment}
                onChange={(e) => setSelectedDepartment(e.target.value)}
                className="w-full bg-gray-700 text-white px-4 py-2 rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
              >
                <option value="all">All Departments</option>
                {departments.map((dept) => (
                  <option key={dept.id} value={dept.id.toString()}>
                    {dept.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </div>

        {/* Departments */}
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredDepartments.map((dept) => (
            <div key={dept.id} className="bg-gray-800 rounded-xl p-6 shadow">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold">{dept.name}</h3>
                <span className="bg-blue-700 text-sm px-3 py-1 rounded-full">
                  {dept.members.length} members
                </span>
              </div>

              {dept.members.length > 0 ? (
                <div className="space-y-3">
                  {dept.members.map((m) => (
                    <div
                      key={m.id}
                      className="flex items-center justify-between bg-gray-700 p-3 rounded-lg"
                    >
                      <div className="flex items-center gap-3">
                        <div className="bg-blue-600 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold text-white">
                          {m.name.charAt(0)}
                          {m.surname.charAt(0)}
                        </div>
                        <div>
                          <p className="font-medium text-white">
                            {m.name} {m.surname}
                          </p>
                          <p className="text-sm text-gray-400">
                            {m.phone} • {m.gender}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-8 text-gray-500 text-sm">
                  No members in this department
                </div>
              )}
            </div>
          ))}
        </div>

        {/* No Results */}
        {filteredDepartments.length === 0 && (
          <div className="text-center mt-12 text-gray-500">
            <p>No departments found. Try adjusting your filters.</p>
          </div>
        )}
      </div>
    </div>
  );
}
