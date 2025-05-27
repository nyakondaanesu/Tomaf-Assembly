import { db } from "../../db"; // Update the path below if your schema file is located elsewhere
import { usersTable } from "../../db/schema";
import { sql } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const totalUsers = await db
      .select({ count: sql`count(*)` })
      .from(usersTable);

    console.log("Total users fetched:", totalUsers[0].count);
    return NextResponse.json({ total: totalUsers[0].count });
  } catch (error) {
    console.error("Error fetching total users:", error);
    return NextResponse.json(
      { error: "Failed to fetch total users" },
      { status: 500 }
    );
  }
}
