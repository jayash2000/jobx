/*
Body Content: name, email, password (validation)
Check if email already exists in database
Hash password
Insert body content into user table
*/

import { hashPassword } from "~~/server/utils/hash";
import { registerSchema } from "../../../shared/schemas/auth";
import { db } from "~~/server/db";
import { users } from "~~/server/db/schema/user.schema";
import { eq } from "drizzle-orm";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) =>
    registerSchema.safeParse(body),
  );

  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid Input",
      message: body.error.issues[0]?.message,
    });
  }

  const { name, email, password } = body.data;

  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existingUser) {
    throw createError({
      statusCode: 409,
      message: "An account with this email already exists!",
    });
  }

  const passwordHash = await hashPassword(password);

  await db.insert(users).values({
    name,
    email,
    passwordHash,
  });

  return { success: true, message: "User registered successfully!" };
});
