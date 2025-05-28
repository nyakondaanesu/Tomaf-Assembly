import {
  FamilyDetailsData,
  MembershipData,
  PersonalDetailsData,
} from "@/app/ttypes";

import { db } from "..";
import {
  personalDetailsTable,
  spouseDetailsTable,
  usersTable,
  membershipTable,
  memberDepartmentsTable,
} from "../schema";

export const SubmitData = async (
  personalDetailsData: PersonalDetailsData,
  memberData: MembershipData,
  familyDetailsData: FamilyDetailsData
) => {
  // Insert into usersTable (basic user info)
  const [user] = await db
    .insert(usersTable)
    .values({
      name: personalDetailsData.firstName,
      surname: personalDetailsData.lastName,
    })
    .returning({ id: usersTable.id });

  const userId = user?.id;

  if (!userId) throw new Error("User ID not returned from insertion.");

  if (!personalDetailsData.dob) {
    throw new Error("Date of birth is required.");
  }

  // Insert personal details
  await db.insert(personalDetailsTable).values({
    id: userId,
    gender: personalDetailsData.gender,
    dob: personalDetailsData.dob.toISOString().split("T")[0],
    phone: personalDetailsData.phone,
    address: personalDetailsData.address,
    nationalId: personalDetailsData.nationalId,
    maritalStatus: personalDetailsData.maritalStatus,
    occupation: personalDetailsData.occupation,
  });

  // Insert family details
  await db.insert(spouseDetailsTable).values({
    id: userId,
    nofamily: familyDetailsData.noFamily,
    spouseName: familyDetailsData.spouseName,
    spouseId: familyDetailsData.spouseID,
    spouseContact: familyDetailsData.spouseContact,
    familsize: familyDetailsData.familySize ?? 0,
    childrenCount: familyDetailsData.childrenCount ?? 0,
    nextOfKin: familyDetailsData.nextOfKin,
  });

  // Insert membership data
  await db.insert(membershipTable).values({
    id: userId,
    dateJoined: memberData.dateJoined
      ? memberData.dateJoined.toISOString().split("T")[0]
      : "",
    isBaptized: memberData.isBaptized,
    ...(memberData.baptismDate && {
      baptismDate: memberData.baptismDate.toISOString().split("T")[0],
    }),
  });

  // Insert all selected departments
  const departmentEntries = Object.entries(memberData.departments); // Record<number, { name, role }>

  for (const [deptId] of departmentEntries) {
    await db.insert(memberDepartmentsTable).values({
      memberId: userId,
      departmentId: Number(deptId),
    });
  }
};
