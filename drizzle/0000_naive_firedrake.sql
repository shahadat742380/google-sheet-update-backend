CREATE TABLE IF NOT EXISTS "tbl_customers" (
	"id" text PRIMARY KEY NOT NULL,
	"user_name" varchar(256),
	"email" text,
	"dob" timestamp,
	"phone" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT current_timestamp,
	CONSTRAINT "tbl_customers_email_unique" UNIQUE("email"),
	CONSTRAINT "tbl_customers_phone_unique" UNIQUE("phone")
);
