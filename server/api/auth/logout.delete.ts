/*
Check if user is authenticated or not
Delete cookie
*/
export default defineEventHandler(async (event) => {
  const userId = event.context.userId;

  if (!userId) {
    throw createError({
      statusCode: 401,
      message: "Unauthorized!",
    });
  }

  deleteCookie(event, "session");

  return { success: true, message: "Logged out successfully!" };
});
