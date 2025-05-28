import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/app/db";
import { userCredentials } from "@/app/db/schema";
import { eq, and, ne } from "drizzle-orm";
import { hash } from "bcryptjs";

export async function POST(request: Request) {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    return NextResponse.json(
      { message: "Unauthorized, please login" },
      { status: 401 }
    );
  }

  const userId = Number(session.user.id);

  try {
    const body = await request.json();
    const { username, password } = body;

    if (!username && !password) {
      return NextResponse.json(
        { message: "No data provided to update" },
        { status: 400 }
      );
    }

    const updates: Partial<{ username: string; password: string }> = {};
    const trimmedUsername = username?.trim();

    if (trimmedUsername) {
      // Check if username already exists (and not same as current user)
      const existing = await db
        .select()
        .from(userCredentials)
        .where(
          and(
            eq(userCredentials.username, trimmedUsername),
            ne(userCredentials.id, userId)
          )
        );

      if (existing.length > 0) {
        return NextResponse.json(
          { message: "Username is already taken" },
          { status: 409 }
        );
      }

      updates.username = trimmedUsername;
    }

    if (password) {
      const hashedPassword = await hash(password, 12);
      updates.password = hashedPassword;
    }

    if (Object.keys(updates).length === 0) {
      return NextResponse.json(
        { message: "No valid updates provided" },
        { status: 400 }
      );
    }

    await db
      .update(userCredentials)
      .set(updates)
      .where(eq(userCredentials.id, userId))
      .execute();

    return NextResponse.json({ message: "Settings updated successfully" });
  } catch (error) {
    console.error("Error updating settings:", error);
    return NextResponse.json(
      { message: "Failed to update settings" },
      { status: 500 }
    );
  }
}
