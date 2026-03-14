import { eq } from "drizzle-orm";
import { db } from "../db";
import { users } from "../db/schema/user.schema";
import { getAuthSession } from "../utils/auth";

/*
Create unauthenticated paths
Check if cookie exists
Check if session exists using cookie
Return session data
*/
export default defineEventHandler(async (event) => {
  const notAuthenticatedPaths = ["auth/login", "auth/register"];
  if (notAuthenticatedPaths.includes(event.path)) return;

  const token = getCookie(event, "session");
  if (!token) return;

  try {
    const session = await getAuthSession(token);

    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.id, session?.userId as string))
      .limit(1);

    event.context.user = user;
  } catch {
    event.context.user = null;
  }
});
