import { v7 as uuid } from "uuid";
import { db } from "../db";
import { sessions } from "../db/schema/auth.schema";
import { eq } from "drizzle-orm";
import { H3Event } from "h3";

/*
create random session token
insert into session table
*/
export async function createAuthSession(userId: string) {
  const sessionToken = uuid();

  await db.insert(sessions).values({
    userId,
    sessionToken,
    expiresAt: new Date(Date.now() + 1000 * 60 * 60 * 24 * 7),
  });

  return sessionToken;
}

// find session token from database
export async function getAuthSession(token: string) {
  const [sessionToken] = await db
    .select()
    .from(sessions)
    .where(eq(sessions.sessionToken, token))
    .limit(1);

  if (!sessionToken) return null;

  return sessionToken;
}

export function requireRole(event: H3Event, roles: string[]) {
  const user = event.context.user;

  if (!user) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  if (!roles.includes(user.role)) {
    throw createError({
      statusCode: 403,
      message: "Forbidden",
    });
  }

  return user;
}
