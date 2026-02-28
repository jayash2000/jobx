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
    event.context.userId = session?.userId;
  } catch {
    event.context.userId = null;
  }
});
