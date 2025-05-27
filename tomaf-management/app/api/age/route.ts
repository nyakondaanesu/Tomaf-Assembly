import { NextResponse } from "next/server";
import { db } from "../../db";
import { personalDetailsTable } from "../../db/schema";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    const ageGroups = await db
      .select({
        ageRange: sql<string>`(
          CASE 
            WHEN EXTRACT(YEAR FROM AGE(CURRENT_DATE, dob)) BETWEEN 0 AND 12 THEN '0-12'
            WHEN EXTRACT(YEAR FROM AGE(CURRENT_DATE, dob)) BETWEEN 13 AND 19 THEN '13-19'
            WHEN EXTRACT(YEAR FROM AGE(CURRENT_DATE, dob)) BETWEEN 20 AND 39 THEN '20-39'
            ELSE '40+'
          END
        ) AS age_range`,
        count: sql<number>`COUNT(*)`,
      })
      .from(personalDetailsTable)
      .groupBy(
        sql`(
        CASE 
          WHEN EXTRACT(YEAR FROM AGE(CURRENT_DATE, dob)) BETWEEN 0 AND 12 THEN '0-12'
          WHEN EXTRACT(YEAR FROM AGE(CURRENT_DATE, dob)) BETWEEN 13 AND 19 THEN '13-19'
          WHEN EXTRACT(YEAR FROM AGE(CURRENT_DATE, dob)) BETWEEN 20 AND 39 THEN '20-39'
          ELSE '40+'
        END
      )`
      )
      .orderBy(sql`age_range`);

    return NextResponse.json(ageGroups);
  } catch (error) {
    console.error("Error fetching age groups:", error);
    return NextResponse.json(
      { error: "Failed to fetch age groups" },
      { status: 500 }
    );
  }
}
