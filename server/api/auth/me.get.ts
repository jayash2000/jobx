import { eq } from "drizzle-orm";
import { email } from "zod";
import { db } from "~~/server/db";
import { users } from "~~/server/db/schema/user.schema";

/*
ENDPOINT: /api/auth/me (GET)
*/

export default defineEventHandler(async (event) => {
  const user = event.context.user;

  if (!user) {
    throw createError({
      statusCode: 403,
      message: "Unauthorized",
    });
  }

  const [findUser] = await db
    .select({
      name: users.name,
      email: users.email,
      isVerified: users.isVerified,
      role: users.role,
    })
    .from(users)
    .where(eq(users.id, user.id))
    .limit(1);

  if (!findUser) {
    throw createError({
      statusCode: 404,
      message: "User not found",
    });
  }

  return { success: true, message: "User found", user: findUser };
});
