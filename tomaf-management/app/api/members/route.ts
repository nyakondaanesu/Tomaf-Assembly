import { db } from "@/app/db";
import { NextResponse } from "next/server";
import { usersTable } from "@/app/db/schema";
import { personalDetailsTable } from "@/app/db/schema";
import { join } from "path";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const joinedData = await db
      .select({
        name: usersTable.name,
        surname: usersTable.surname,
        gender: personalDetailsTable.gender,
      })
      .from(usersTable)
      .innerJoin(
        personalDetailsTable,
        eq(usersTable.id, personalDetailsTable.id)
      );

    console.log("Fetched members:", joinedData);
    return NextResponse.json(joinedData);
  } catch (error) {
    console.error("Error fetching members:", error);
    return NextResponse.json(
      { error: "Failed to fetch members" },
      { status: 500 }
    );
  }
}
