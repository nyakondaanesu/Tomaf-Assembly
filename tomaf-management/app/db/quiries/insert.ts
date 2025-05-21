import {
  FamilyDetailsData,
  MembershipData,
  PersonalDetailsData,
} from "@/app/ttypes";
import { db } from "..";
import {
  memberDepartmentsTable,
  membershipTable,
  personalDetailsTable,
  spouseDetailsTable,
  usersTable,
} from "../schema";

// insert.ts
export const SubmitData = async (
  personalDetailsData: PersonalDetailsData,
  memberData: MembershipData,
  familyDetailsData: FamilyDetailsData
) => {
  const [user] = await db
    .insert(usersTable)
    .values({
      name: personalDetailsData.firstName,
      surname: personalDetailsData.lastName,
    })
    .returning({ id: usersTable.id });

  const userId = user?.id;

  if (!personalDetailsData.dob) {
    throw new Error("Date of birth is required");
  }

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

  await db.insert(spouseDetailsTable).values({
    id: userId,
    nofamily: familyDetailsData.noFamily,
    spouseName: familyDetailsData.spouseName,
    spouseId: familyDetailsData.spouseID,
    familsize: familyDetailsData.familySize,
    childrenCount: familyDetailsData.childrenCount,
    nextOfKin: familyDetailsData.nextOfKin,
    spouseContact: familyDetailsData.spouseContact,
  });

  await db.insert(membershipTable).values({
    id: userId,
    dateJoined: memberData.dateJoined?.toISOString().split("T")[0],
    isBaptized: memberData.isBaptized,
    baptismDate: memberData.baptismDate?.toISOString().split("T")[0],
  });

  // Insert all selected departments
  const departments = Object.entries(memberData.departments).map(
    ([id, dept]) => ({
      memberId: userId,
      departmentId: parseInt(id), // since id is a string in Object.entries
      role: dept.role,
    })
  );

  if (departments.length > 0) {
    await db.insert(memberDepartmentsTable).values(departments);
  }
};
