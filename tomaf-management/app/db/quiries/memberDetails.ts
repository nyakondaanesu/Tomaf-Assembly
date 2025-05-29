import { db } from "@/app/db";
import {
  usersTable,
  personalDetailsTable,
  spouseDetailsTable,
  membershipTable,
} from "@/app/db/schema";
import { eq } from "drizzle-orm";

export const getFullMemberDetails = async () => {
  const result = await db
    .select()
    .from(usersTable)
    .leftJoin(personalDetailsTable, eq(usersTable.id, personalDetailsTable.id))
    .leftJoin(spouseDetailsTable, eq(usersTable.id, spouseDetailsTable.id))
    .leftJoin(membershipTable, eq(usersTable.id, membershipTable.id));

  return result.map((row) => ({
    id: row.users.id,
    name: row.users.name,
    surname: row.users.surname,
    personalDetails: row.Personal_details, // Make sure this matches your table alias
    spouseDetails: row.spouse_details,
    membership: row.membership,
  }));
};
