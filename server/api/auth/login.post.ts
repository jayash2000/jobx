/*
Body Content: email, password (validation)
Check if user is already logged in
Verify if email exists in database
Verify password with database
Create session record in database
Set secure HttpOnly cookie
*/

import { eq } from "drizzle-orm";
import { db } from "~~/server/db";
import { users } from "~~/server/db/schema/user.schema";
import { createAuthSession } from "~~/server/utils/auth";
import { loginSchema } from "~~/shared/schemas/auth";

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) =>
    loginSchema.safeParse(body),
  );

  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid Input",
      message: body.error.issues[0]?.message,
    });
  }

  const { email, password } = body.data;

  const token = getCookie(event, "session");

  if (token) {
    return {
      success: true,
      message: "Already authenticated!",
    };
  }

  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!existingUser) {
    throw createError({
      statusCode: 404,
      message: "Invalid email or password",
    });
  }

  const isPasswordMatching = await verifyPassword(
    existingUser.passwordHash,
    password,
  );

  if (!isPasswordMatching) {
    throw createError({
      statusCode: 401,
      message: "Invalid email or password",
    });
  }

  const sessionToken = await createAuthSession(existingUser.id);

  setCookie(event, "session", sessionToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
  });

  return { success: true, message: "Login successful!" };
});
