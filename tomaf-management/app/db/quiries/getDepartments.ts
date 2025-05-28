import { db } from "../index";
import {
  usersTable,
  departmentsTable,
  memberDepartmentsTable,
  personalDetailsTable,
} from "../schema"; // <-- Replace with the actual path to your schema file
import { eq } from "drizzle-orm";

export async function getDepartmentsWithMembers() {
  try {
    const departments = await db
      .select({
        departmentId: departmentsTable.id,
        departmentName: departmentsTable.name,
        memberId: usersTable.id,
        memberName: usersTable.name,
        memberSurname: usersTable.surname,
        memberPhone: personalDetailsTable.phone,
        memberGender: personalDetailsTable.gender,
      })
      .from(departmentsTable)
      .leftJoin(
        memberDepartmentsTable,
        eq(departmentsTable.id, memberDepartmentsTable.departmentId)
      )
      .leftJoin(usersTable, eq(memberDepartmentsTable.memberId, usersTable.id))
      .leftJoin(
        personalDetailsTable,
        eq(usersTable.id, personalDetailsTable.id)
      )
      .orderBy(departmentsTable.name, usersTable.name);

    // Group the results by department
    const groupedDepartments = departments.reduce((acc, row) => {
      const deptId = row.departmentId;

      if (!acc[deptId]) {
        acc[deptId] = {
          id: row.departmentId,
          name: row.departmentName,
          members: [],
        };
      }

      if (row.memberId) {
        acc[deptId].members.push({
          id: row.memberId,
          name: row.memberName,
          surname: row.memberSurname,
          phone: row.memberPhone,
          gender: row.memberGender,
        });
      }

      return acc;
    }, {} as Record<number, any>);

    return Object.values(groupedDepartments);
  } catch (error) {
    console.error("Error fetching departments with members:", error);
    throw new Error("Failed to fetch departments");
  }
}
