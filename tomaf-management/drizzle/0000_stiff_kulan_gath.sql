CREATE TABLE "departments" (
	"id" serial PRIMARY KEY NOT NULL,
	"name" varchar(100) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "member_departments" (
	"member_id" integer NOT NULL,
	"department_id" integer NOT NULL
);
--> statement-breakpoint
CREATE TABLE "membership" (
	"member_id" integer PRIMARY KEY NOT NULL,
	"date_joined" date NOT NULL,
	"is_baptized" boolean NOT NULL,
	"baptism_date" date
);
--> statement-breakpoint
CREATE TABLE "Personal_details" (
	"member_id" integer PRIMARY KEY NOT NULL,
	"gender" varchar(10) NOT NULL,
	"dob" date NOT NULL,
	"phone" varchar(20) NOT NULL,
	"address" varchar(255) NOT NULL,
	"national_id" varchar(20),
	"marital_status" varchar(20) NOT NULL,
	"occupation" varchar(50) NOT NULL
);
--> statement-breakpoint
CREATE TABLE "spouse_details" (
	"member_id" integer PRIMARY KEY NOT NULL,
	"no_family" boolean NOT NULL,
	"spouse_name" varchar(255),
	"spouse_id" varchar(20),
	"family_size" integer,
	"children_count" integer,
	"next_of_kin" varchar(255),
	"spouse_contact" varchar(20)
);
--> statement-breakpoint
CREATE TABLE "users" (
	"member_id" serial PRIMARY KEY NOT NULL,
	"name" varchar(255) NOT NULL,
	"surname" varchar(255) NOT NULL
);
--> statement-breakpoint
ALTER TABLE "member_departments" ADD CONSTRAINT "member_departments_member_id_users_member_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."users"("member_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "member_departments" ADD CONSTRAINT "member_departments_department_id_departments_id_fk" FOREIGN KEY ("department_id") REFERENCES "public"."departments"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "membership" ADD CONSTRAINT "membership_member_id_users_member_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."users"("member_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "Personal_details" ADD CONSTRAINT "Personal_details_member_id_users_member_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."users"("member_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "spouse_details" ADD CONSTRAINT "spouse_details_member_id_users_member_id_fk" FOREIGN KEY ("member_id") REFERENCES "public"."users"("member_id") ON DELETE cascade ON UPDATE no action;