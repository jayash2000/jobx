import { pgTable, text, timestamp, uuid } from "drizzle-orm/pg-core";
import { users } from "./user.schema";

export const sessions = pgTable("sessions", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id").references(() => users.id),
  sessionToken: text("session_token").notNull(),
  expiresAt: timestamp("expires_at").notNull(),
});

export const verificationTokens = pgTable("verification_tokens", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id"),
  verificationToken: text("verification_token"),
  expiresAt: timestamp("expires_at"),
});

export const passwordResetTokens = pgTable("reset_tokens", {
  id: uuid("id").defaultRandom().primaryKey(),
  userId: uuid("user_id"),
  passwordResetToken: text("password_reset_token"),
  expiresAt: timestamp("expires_at"),
});
