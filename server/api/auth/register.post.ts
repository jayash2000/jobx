/*
Body Content: name, email, password (validation)
Check if email already exists in database
Hash password
Insert body content into user table
User verified: false
Generate secure random token
Save token in database with expiry
Send email with verification link

ENDPOINT: /api/auth/register (POST)
*/

import { hashPassword, hashToken } from "~~/server/utils/hash";
import { registerSchema } from "../../../shared/schemas/auth";
import { db } from "~~/server/db";
import { users } from "~~/server/db/schema/user.schema";
import { eq } from "drizzle-orm";
import { verificationTokens } from "~~/server/db/schema/auth.schema";
import { sendAuthMail } from "~~/server/utils/email";

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
      message: "An account with this email already exists",
    });
  }

  const passwordHash = await hashPassword(password);

  const [user] = await db
    .insert(users)
    .values({
      name,
      email,
      passwordHash,
      isVerified: false,
    })
    .returning();

  const verificationToken = generateToken();
  const hashedToken = hashToken(verificationToken);

  await db.insert(verificationTokens).values({
    userId: user?.id as string,
    verificationToken: hashedToken,
    // 24 hours expiry date
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24),
  });

  await sendAuthMail({
    email,
    token: verificationToken,
    subject: "Verify your email",
    heading: "Email Verification",
    purpose: "verify",
    path: "verification",
    actionText: "Verify Email",
  });

  return {
    success: true,
    message: "User registered successfully! Check your email for verification",
  };
});
