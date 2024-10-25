import { sql } from "drizzle-orm";
import {  text, timestamp, varchar } from "drizzle-orm/pg-core";

// ** import db utils
import { pgTable } from "@/db/utils";

import { uuid as uuidv4 } from "uuidv4";

export const customers = pgTable("customers", {
  id: text("id")
    .$defaultFn(() => uuidv4())
    .primaryKey(),
  user_name: varchar("user_name", { length: 256 }),
  email: text("email").unique(),
  dob: timestamp("dob"),
  phone: text("phone").notNull().unique(),
  created_at: timestamp("created_at").defaultNow().notNull(),
  updated_at: timestamp("updated_at")
    .default(sql`current_timestamp`)
    .$onUpdate(() => new Date()),
});

export type Customer = typeof customers.$inferSelect;
export type NewCustomer = typeof customers.$inferInsert;
