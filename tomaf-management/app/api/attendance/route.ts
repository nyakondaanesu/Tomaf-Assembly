// /app/api/members/monthly/route.ts
import { NextResponse } from "next/server";
import { db } from "@/app/db";
import { sql } from "drizzle-orm";

export async function GET() {
  try {
    const result = await db.execute(
      sql`
       SELECT 
          TO_CHAR(DATE_TRUNC('month', date_joined), 'YYYY-MM') AS join_month,
          COUNT(*) AS member_count
        FROM membership
        WHERE EXTRACT(YEAR FROM date_joined) = EXTRACT(YEAR FROM CURRENT_DATE)
        GROUP BY join_month
        ORDER BY join_month
      `
    );

    return NextResponse.json(result.rows);
  } catch (error) {
    console.error("Error fetching membership growth:", error);
    return NextResponse.json(
      { error: "Failed to load growth data" },
      { status: 500 }
    );
  }
}
