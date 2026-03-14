import { eq } from "drizzle-orm";
import { db } from "~~/server/db";
import { verificationTokens } from "~~/server/db/schema/auth.schema";
import { users } from "~~/server/db/schema/user.schema";
import { hashToken } from "~~/server/utils/hash";
import { verifyTokenSchema } from "~~/shared/schemas/auth";

/*
get token from query (validation)
check if valid & not expired
mark user as verified
delete token

ENDPOINT: /api/auth/verify?token=<token> (GET)
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

  const { token } = query.data;
  const hashedToken = hashToken(token);

  const [findToken] = await db
    .select()
    .from(verificationTokens)
    .where(eq(verificationTokens.verificationToken, hashedToken))
    .limit(1);

  if (!findToken || findToken.expiresAt < new Date(Date.now())) {
    throw createError({
      statusCode: 400,
      message: "Invalid or expired token",
    });
  }

  await db
    .update(users)
    .set({
      isVerified: true,
    })
    .where(eq(users.id, findToken.userId));

  await db
    .delete(verificationTokens)
    .where(eq(verificationTokens.id, findToken.id));

  return { success: true, message: "Email verified successfully!" };
});
