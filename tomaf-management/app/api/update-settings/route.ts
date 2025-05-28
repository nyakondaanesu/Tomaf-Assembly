import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { db } from "@/app/db";
import { userCredentials } from "@/app/db/schema";
import { eq } from "drizzle-orm";
import { hash } from "bcryptjs";

export async function POST(request: Request) {
  // Now getServerSession accepts the request object directly
  const session = await getServerSession(authOptions);

  console.log(`your session ${session?.user.id}`);

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

    const updateData: Partial<{ username: string; password: string }> = {};

    if (username) {
      updateData.username = username;
    }
    if (password) {
      const hashedPassword = await hash(password, 12);
      updateData.password = hashedPassword;
    }

    await db
      .update(userCredentials)
      .set(updateData)
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
