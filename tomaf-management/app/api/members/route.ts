import { db } from "@/app/db";
import { usersTable, personalDetailsTable } from "@/app/db/schema";
import { eq } from "drizzle-orm";

export async function GET() {
  try {
    const result = await db
      .select({
        id: usersTable.id,
        name: usersTable.name,
        surname: usersTable.surname,
        gender: personalDetailsTable.gender,
        dob: personalDetailsTable.dob,
      })
      .from(usersTable)
      .leftJoin(
        personalDetailsTable,
        eq(usersTable.id, personalDetailsTable.id)
      );

    return Response.json(result);
  } catch (error) {
    console.error("Error fetching members:", error);
    return new Response("Internal Server Error", { status: 500 });
  }
}
