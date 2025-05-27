import { NextResponse } from "next/server";
import { db } from "@/app/db"; // Adjust if your db path is different
import { personalDetailsTable } from "@/app/db/schema";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    const genderCounts = await db
      .select({
        gender: personalDetailsTable.gender,
        count: sql<number>`count(*)`.as("count"),
      })
      .from(personalDetailsTable)
      .groupBy(personalDetailsTable.gender);

    // Initialize counts
    const formatted = {
      male: 0,
      female: 0,
      other: 0,
    };

    // Assign counts based on gender values
    genderCounts.forEach(({ gender, count }) => {
      const key = gender?.toLowerCase();
      if (key === "male") formatted.male = count;
      else if (key === "female") formatted.female = count;
      else formatted.other += count; // fallback for unknown/other values
    });
    console.log(`${formatted.male}`);
    return NextResponse.json(formatted);
  } catch (error) {
    console.error("Failed to fetch gender counts:", error);
    return NextResponse.json(
      { error: "Failed to retrieve gender statistics" },
      { status: 500 }
    );
  }
}
