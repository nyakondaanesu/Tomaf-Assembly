CREATE TABLE "user_personal_details" (
	"user_id" integer NOT NULL,
	"personal_details_id" integer NOT NULL
);
--> statement-breakpoint
ALTER TABLE "user_personal_details" ADD CONSTRAINT "user_personal_details_user_id_users_member_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."users"("member_id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "user_personal_details" ADD CONSTRAINT "user_personal_details_personal_details_id_Personal_details_member_id_fk" FOREIGN KEY ("personal_details_id") REFERENCES "public"."Personal_details"("member_id") ON DELETE cascade ON UPDATE no action;