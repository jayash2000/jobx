/*
Check if user is authenticated or not
Delete cookie
*/
export default defineEventHandler(async (event) => {
  const user = event.context.user;

  if (!user) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized",
    });
  }

  deleteCookie(event, "session");

  return { success: true, message: "Logged out successfully" };
});
