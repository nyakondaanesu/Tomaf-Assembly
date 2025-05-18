// app/types.ts

export interface PersonalDetailsData {
  firstName: string;
  lastName: string;
  dob: Date | null;
  gender: string;
  phone: string;
  address: string;
  nationalId: string;
  maritalStatus: string;
}

export interface FamilyDetailsData {
  noFamily: boolean;
  spouseName: string;
  spouseID: string;
  spouseContact: string;
  occupation: string;
  familySize: string;
  childrenCount: string;
  nextOfKin: string;
}

export interface MembershipData {
  dateJoined: Date | null;
  isBaptized: boolean;
  baptismDate: Date | null;
  departments: Record<string, string>;
}

export interface FormData {
  personalDetails: PersonalDetailsData;
  familyDetails: FamilyDetailsData;
  membership: MembershipData;
}
