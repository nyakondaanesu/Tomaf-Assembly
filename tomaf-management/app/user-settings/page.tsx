"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Toaster, toast } from "sonner";
import Link from "next/link";
import { useSession } from "next-auth/react";

export default function UserSettingsPage() {
  const { data: session, status } = useSession();

  const [username, setUsername] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (session?.user?.name) {
      setUsername(session.user.name);
    }
  }, [session]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!username.trim()) {
      toast.error("Username cannot be empty");
      return;
    }

    setLoading(true);

    try {
      const res = await fetch("/api/update-settings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, password: newPassword }),
      });

      const data = await res.json();

      if (!res.ok) {
        throw new Error(data.message || "Failed to update settings");
      }

      toast.success("account updated successfully!");
      setNewPassword(""); // Clear password field on success
    } catch (error: any) {
      toast.error(error.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };

  if (status === "loading") {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <p>Loading user data...</p>
      </main>
    );
  }

  if (!session) {
    return (
      <main className="min-h-screen flex items-center justify-center bg-gray-950 text-white p-4">
        <p>You must be logged in to access this page.</p>
        <Link
          href="/login"
          className="ml-2 text-blue-400 underline hover:text-blue-600"
        >
          Go to Login
        </Link>
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-gray-950 text-white p-4 md:p-8">
      <Toaster richColors position="top-right" />

      <div className="flex justify-center mb-6">
        <Image src="/afmlogo.png" alt="Church Logo" width={80} height={80} />
      </div>

      <h1 className="text-3xl font-bold text-center mb-4">Account Settings</h1>
      <p className="text-center text-gray-400 mb-8">
        Update your username and password for your church management account.
      </p>

      <form
        onSubmit={handleSubmit}
        className="max-w-md mx-auto space-y-6 bg-gray-900 p-8 rounded-3xl shadow-lg"
      >
        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-300">
            New Username
          </label>
          <Input
            placeholder="Enter new username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
            required
          />
        </div>

        <div>
          <label className="block mb-2 text-sm font-semibold text-gray-300">
            New Password
          </label>
          <Input
            type="password"
            placeholder="Enter new password"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
            className="bg-gray-800 border-gray-700 text-white"
          />
          <p className="mt-1 text-xs text-gray-500">
            Leave blank to keep current password
          </p>
        </div>

        <Button
          type="submit"
          disabled={loading}
          className="w-full bg-blue-600 hover:bg-blue-700"
        >
          {loading ? "Updating..." : "Update Account"}
        </Button>
      </form>

      <div className="mt-8 text-center">
        <Link href="/Home" className="text-blue-400 hover:underline">
          ← Back to Home
        </Link>
      </div>
    </main>
  );
}
