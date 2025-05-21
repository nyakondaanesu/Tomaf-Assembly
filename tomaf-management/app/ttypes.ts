export interface PersonalDetailsData {
  firstName: string;
  lastName: string;
  dob: Date | null;
  gender: string;
  phone: string;
  address: string;
  nationalId: string;
  maritalStatus: string;
  occupation: string;
}

export interface FamilyDetailsData {
  noFamily: boolean;
  spouseName: string;
  spouseID: string;
  spouseContact: string;
  familySize?: number;
  childrenCount?: number;
  nextOfKin: string;
}

// Represents a single department a user is part of
export interface DepartmentData {
  name: string; // Department name, e.g., "Ushering"
  role: string; // User's role in that department, e.g., "Member"
}

export interface Department {
  id: number;
  name: string;
}

export interface MembershipData {
  dateJoined: Date;
  isBaptized: boolean;
  baptismDate: Date | null;
  departments: Record<number, DepartmentData>; // departmentId -> data
}

// Aggregates all steps of the registration form
export interface FormData {
  personalDetails: PersonalDetailsData;
  familyDetails: FamilyDetailsData;
  membership: MembershipData;
  department: Department;
}
