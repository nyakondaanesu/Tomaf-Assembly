// db/schema.ts
import { db } from ".";
import {
  integer,
  pgTable,
  varchar,
  date,
  serial,
  boolean,
} from "drizzle-orm/pg-core";

// Users table
export const usersTable = pgTable("users", {
  id: serial("member_id").primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  surname: varchar("surname", { length: 255 }).notNull(),
});

// Member details table
export const personalDetailsTable = pgTable("Personal_details", {
  id: integer("member_id")
    .primaryKey()
    .references(() => usersTable.id, { onDelete: "cascade" }),
  gender: varchar("gender", { length: 10 }).notNull(),
  dob: date("dob").notNull(),
  phone: varchar("phone", { length: 20 }).notNull(),
  address: varchar("address", { length: 255 }).notNull(),
  nationalId: varchar("national_id", { length: 20 }),
  maritalStatus: varchar("marital_status", { length: 20 }).notNull(),
  occupation: varchar("occupation", { length: 50 }).notNull(),
});

// Spouse details table
export const spouseDetailsTable = pgTable("spouse_details", {
  id: integer("member_id")
    .primaryKey()
    .references(() => usersTable.id, { onDelete: "cascade" }),

  nofamily: boolean("no_family").notNull(),
  spouseName: varchar("spouse_name", { length: 255 }),
  spouseId: varchar("spouse_id", { length: 20 }),
  familsize: integer("family_size"),
  childrenCount: integer("children_count"),
  nextOfKin: varchar("next_of_kin", { length: 255 }),
  spouseContact: varchar("spouse_contact", { length: 20 }),
});

// Membership table
export const membershipTable = pgTable("membership", {
  id: integer("member_id")
    .primaryKey()
    .references(() => usersTable.id, { onDelete: "cascade" }),

  dateJoined: date("date_joined").notNull(),
  isBaptized: boolean("is_baptized").notNull(),
  baptismDate: date("baptism_date"),
});

// Departments table
export const departmentsTable = pgTable("departments", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
});

// Join table for many-to-many member <-> department relationship
export const memberDepartmentsTable = pgTable("member_departments", {
  memberId: integer("member_id")
    .references(() => usersTable.id, { onDelete: "cascade" })
    .notNull(),

  departmentId: integer("department_id")
    .references(() => departmentsTable.id, { onDelete: "cascade" })
    .notNull(),
});
/*
async function seedDepartments() {
  await db
    .insert(departmentsTable)
    .values([
      { name: "Praise and Worship" },
      { name: "Media" },
      { name: "Administration" },
      { name: "Hospitality and Decorations" },
      { name: "Ushering" },
      { name: "Prayer and Intercession" },
      { name: "Sunday School and Young generation" },
      { name: "Evangelism" },
      { name: "Couples union" },
      { name: "ladies union" },
      { name: "men's fellowship" },
      { name: "welfare" },
      { name: "Boys" },
      { name: "Girls" },
    ]);
}

seedDepartments();
*/
