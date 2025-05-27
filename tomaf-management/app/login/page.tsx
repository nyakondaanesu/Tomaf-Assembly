"use client";

import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Eye, EyeOff, Mail, Lock } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function WaveLogin() {
  const [showPassword, setShowPassword] = useState(false);
  const [role, setRole] = useState<"user" | "admin">("user");

  return (
    <div className="min-h-screen flex flex-col justify-center items-center bg-gradient-to-br from-indigo-50 to-white px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6">
        {/* Logo + Title */}
        <div className="flex flex-col items-center gap-2">
          <Image
            src="/afmlogo.png"
            alt="AFM Logo"
            width={80}
            height={80}
            className="mb-2"
          />
          <h1 className="text-2xl font-bold text-indigo-900">
            Tomaf Church Portal
          </h1>
          <p className="text-sm text-gray-500">
            Enter your login details below
          </p>
        </div>

        {/* Role selection */}
        <div className="flex justify-center gap-3">
          {["user", "admin"].map((r) => (
            <Button
              key={r}
              type="button"
              onClick={() => setRole(r as "user" | "admin")}
              variant={role === r ? "default" : "outline"}
              className={`rounded-full px-6 text-sm transition-all duration-200 ${
                role === r
                  ? "bg-indigo-600 text-white hover:bg-indigo-700"
                  : "border-indigo-500 text-indigo-600 hover:bg-indigo-50"
              }`}
            >
              {r.charAt(0).toUpperCase() + r.slice(1)}
            </Button>
          ))}
        </div>

        {/* Login Form */}
        <form className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
            <Input
              type="email"
              placeholder="Email ID"
              className="pl-10 py-2.5 text-sm"
            />
          </div>

          <div className="relative">
            <Lock className="absolute left-3 top-2.5 text-gray-400 h-5 w-5" />
            <Input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              className="pl-10 pr-10 py-2.5 text-sm"
            />
            <button
              type="button"
              onClick={() => setShowPassword(!showPassword)}
              className="absolute right-3 top-2.5 text-gray-400"
            >
              {showPassword ? (
                <EyeOff className="h-5 w-5" />
              ) : (
                <Eye className="h-5 w-5" />
              )}
            </button>
          </div>

          <Button className="w-full bg-indigo-600 hover:bg-indigo-700 text-white rounded-full py-2.5 text-sm font-semibold">
            Log in
          </Button>
        </form>

        {/* Footer */}
        <p className="text-center text-xs text-gray-500 italic pt-2">
          “For where two or three gather in my name, there am I with them.”
          <br />– Matthew 18:20
        </p>

        <div className="text-center text-sm pt-2">
          <span className="text-gray-500">Don’t have an account? </span>
          <Link
            href="/signup"
            className="text-indigo-600 font-medium hover:underline"
          >
            Sign up
          </Link>
        </div>
      </div>
    </div>
  );
}
