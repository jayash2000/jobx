import {
  boolean,
  integer,
  pgEnum,
  pgTable,
  timestamp,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";

export const userRoleEnum = pgEnum("user_role", [
  "candidate",
  "recruiter",
  "admin",
]);

export const users = pgTable("users", {
  id: uuid("id").defaultRandom().primaryKey(),
  name: varchar("name", { length: 100 }).notNull(),
  email: varchar("email", { length: 255 }).unique().notNull(),
  passwordHash: varchar("password_hash", { length: 200 }).notNull(),

  role: userRoleEnum("role").default("candidate").notNull(),

  isVerified: boolean("is_verified").default(false).notNull(),
  emailVerifiedAt: timestamp("email_verified_at", { withTimezone: true }),

  failedAttempts: integer("failed_attempts").default(0).notNull(),
  lockedUntil: timestamp("locked_until"),

  lastLoginAt: timestamp("last_login_at", { withTimezone: true }),

  createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  updatedAt: timestamp("updated_at", { withTimezone: true })
    .defaultNow()
    .$onUpdate(() => new Date()),
});
