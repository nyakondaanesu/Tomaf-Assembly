import { db } from "@/app/db";
import { NextResponse } from "next/server";
import { usersTable } from "@/app/db/schema";

export async function GET() {
  try {
    const members = await db.select().from(usersTable);

    return NextResponse.json(members);
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json(
      { error: "Failed to fetch members" },
      { status: 500 }
    );
  }
}
