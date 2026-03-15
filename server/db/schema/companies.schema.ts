import {
  index,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { users } from "./user.schema";

export const companyRoleEnum = pgEnum("company_role", [
  "owner",
  "admin",
  "recruiter",
  "member",
]);

export const companies = pgTable(
  "companies",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    name: varchar("name", { length: 100 }).notNull(),
    slug: varchar("slug", { length: 200 }).unique().notNull(),
    description: text("description").notNull(),

    location: varchar("location", { length: 100 }),
    website: text("website"),
    logoUrl: text("logo_url"),

    ownerId: uuid("owner_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [index("company_owner_idx").on(table.ownerId)],
);

export const companyMembers = pgTable("company_members", {
  id: uuid("id").defaultRandom().primaryKey(),
  companyId: uuid("company_id")
    .references(() => companies.id, { onDelete: "cascade" })
    .notNull(),
  userId: uuid("user_id")
    .references(() => users.id, { onDelete: "cascade" })
    .notNull(),
  role: companyRoleEnum("role").notNull().default("member"),
  createdAt: timestamp("created_at", { withTimezone: true })
    .defaultNow()
    .notNull(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date()),
});
