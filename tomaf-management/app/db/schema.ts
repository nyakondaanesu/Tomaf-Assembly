// db/schema.ts

import {
  integer,
  pgTable,
  varchar,
  date,
  serial,
  boolean,
} from "drizzle-orm/pg-core";
import { relations } from "drizzle-orm";
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

// a user has one personal detail

export const userRelations = relations(usersTable, ({ one }) => ({
  personalDetails: one(personalDetailsTable, {
    fields: [usersTable.id],
    references: [personalDetailsTable.id],
  }),
  spouseDetails: one(spouseDetailsTable, {
    fields: [usersTable.id],
    references: [spouseDetailsTable.id],
  }),
  membership: one(membershipTable, {
    fields: [usersTable.id],
    references: [membershipTable.id],
  }),
}));

export const personalDetailsRelations = relations(
  personalDetailsTable,
  ({ one }) => ({
    user: one(usersTable, {
      fields: [personalDetailsTable.id],
      references: [usersTable.id],
    }),
  })
);

export const userCredentials = pgTable("user_credentials", {
  id: serial("id").primaryKey(), // <-- add this
  username: varchar("username", { length: 50 }).notNull(),
  password: varchar("password", { length: 255 }).notNull(),
  role: varchar("role").notNull(),
});
