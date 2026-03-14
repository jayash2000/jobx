import { eq } from "drizzle-orm";
import { db } from "~~/server/db";
import { passwordResetTokens, sessions } from "~~/server/db/schema/auth.schema";
import { users } from "~~/server/db/schema/user.schema";
import { hashToken } from "~~/server/utils/hash";
import { resetPasswordSchema, verifyTokenSchema } from "~~/shared/schemas/auth";

/*
USER CLICKS EMAIL LINK
- Opens reset page with token [frontend]
- Submits new password
- Updates user password
- Deletes token

ENDPOINT: /api/auth/reset-password?token=<token> (POST)
*/

export default defineEventHandler(async (event) => {
  const query = await getValidatedQuery(event, (body) =>
    verifyTokenSchema.safeParse(body),
  );

  if (!query.success) {
    throw createError({
      statusCode: 400,
      message: query.error.issues[0]?.message,
    });
  }

  const body = await readValidatedBody(event, (body) =>
    resetPasswordSchema.safeParse(body),
  );

  if (!body.success) {
    throw createError({
      statusCode: 400,
      message: body.error.issues[0]?.message,
    });
  }

  const { token } = query.data;
  const hashedToken = hashToken(token);

  const [record] = await db
    .select()
    .from(passwordResetTokens)
    .where(eq(passwordResetTokens.passwordResetToken, hashedToken))
    .limit(1);

  if (!record || record.expiresAt < new Date(Date.now())) {
    throw createError({
      statusCode: 400,
      message: "Invalid or expired token",
    });
  }

  const { password } = body.data;

  const passwordHash = await hashPassword(password);

  await db
    .update(users)
    .set({
      passwordHash,
    })
    .where(eq(users.id, record.userId));

  // Delete sessions from all active devices (force logout)
  await db.delete(sessions).where(eq(sessions.userId, record.userId));

  return {
    success: true,
    message:
      "Your password has been updated. You can now log in with your new password.",
  };
});
