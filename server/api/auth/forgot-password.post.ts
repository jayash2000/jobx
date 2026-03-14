import { eq } from "drizzle-orm";
import { db } from "~~/server/db";
import { passwordResetTokens } from "~~/server/db/schema/auth.schema";
import { users } from "~~/server/db/schema/user.schema";
import { sendAuthMail } from "~~/server/utils/email";
import { hashToken } from "~~/server/utils/hash";
import { forgotPasswordSchema } from "~~/shared/schemas/auth";

/*
USER CLICKS FORGOT PASSWORD
- BODY (email)
- Enter email & verify its existence
- We generate reset token
- Save token in DB (with expiry)
- Send reset link via email

ENDPOINT: /api/auth/forgot-password (POST)
*/
export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) =>
    forgotPasswordSchema.safeParse(body),
  );

  if (!body.success) {
    throw createError({
      statusCode: 400,
      message: body.error.issues[0]?.message,
    });
  }

  const { email } = body.data;

  const [user] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user) {
    throw createError({
      statusCode: 404,
      message: "Could not find user with the associated email",
    });
  }

  // delete all password reset token related to this user (no multi active tokens)
  await db
    .delete(passwordResetTokens)
    .where(eq(passwordResetTokens.userId, user.id));

  const passwordResetToken = generateToken();
  const hashedToken = hashToken(passwordResetToken);

  await db.insert(passwordResetTokens).values({
    userId: user.id,
    passwordResetToken: hashedToken,
    // 1 hour
    expiresAt: new Date(Date.now() + 1000 * 60 * 60),
  });

  await sendAuthMail({
    email,
    token: passwordResetToken,
    path: "reset-password",
    subject: "Reset your password",
    heading: "Password reset",
    purpose: "reset",
    actionText: "Reset Password",
  });

  return {
    success: true,
    message:
      "If an account exists with that email, we’ve sent a password reset link. Please check your inbox (and spam folder).",
  };
});
