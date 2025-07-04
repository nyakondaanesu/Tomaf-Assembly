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
  dateJoined: Date | null;
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

export type Filters = {
  minAge?: number;
  maxAge?: number;
  gender?: string;
};

export type FullMemberDetails = {
  id: number;
  name: string;
  surname: string;
  personalDetails: {
    gender: string;
    dob: string;
    phone: string;
    address: string;
    nationalId?: string | null;
    maritalStatus: string;
    occupation: string;
  } | null;
  spouseDetails: {
    nofamily: boolean;
    spouseName?: string;
    spouseId?: string;
    familsize?: number;
    childrenCount?: number;
    nextOfKin?: string;
    spouseContact?: string;
  } | null;
  membership: {
    dateJoined: string;
    isBaptized: boolean;
    baptismDate: string | null;
  } | null;
};
