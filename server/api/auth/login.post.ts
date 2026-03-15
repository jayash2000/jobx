/*
Body Content: email, password (validation)
Request arrives
Rate limiter checks IP with email
If too many attempts → block
Check if user is already logged in
Verify if email exists in database
Verify password with database
Verify if user with that email is verified
Create session record in database
Set secure HttpOnly cookie
Log audit event

ENDPOINT: /api/auth/login (POST)
*/

import { eq } from "drizzle-orm";
import { db } from "~~/server/db";
import { users } from "~~/server/db/schema/user.schema";
import { createAuthSession } from "~~/server/utils/auth";
import { loginSchema } from "~~/shared/schemas/auth";
import { RateLimiterMemory } from "rate-limiter-flexible";
import { auditLogs, sessions } from "~~/server/db/schema/auth.schema";

const limiter = new RateLimiterMemory({
  // max attempts
  points: 5,
  // per 15 minutes
  duration: 15 * 60,
});

export default defineEventHandler(async (event) => {
  const body = await readValidatedBody(event, (body) =>
    loginSchema.safeParse(body),
  );

  if (!body.success) {
    throw createError({
      statusCode: 400,
      statusMessage: "Invalid Input",
      message: body.error.issues[0]?.message,
    });
  }

  const { email, password } = body.data;

  const token = getCookie(event, "session");

  if (token) {
    return {
      success: true,
      message: "Already authenticated",
    };
  }

  const ip = getRequestIP(event, { xForwardedFor: true }) || "unknown";
  const key = `${email}-${ip}`;

  try {
    await limiter.consume(key);
  } catch (error) {
    throw createError({
      statusCode: 429,
      message: "Too many login attempts. Please try again in 15 minutes.",
    });
  }

  const [existingUser] = await db
    .select()
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!existingUser) {
    throw createError({
      statusCode: 401,
      message: "Invalid email or password",
    });
  }

  // e.g. 3:10 blocked until 3:40; currently 3:30 i.e. 3:40 > 3:30
  if (existingUser.lockedUntil && existingUser.lockedUntil > new Date()) {
    throw createError({
      statusCode: 403,
      message: "Account temporarily locked",
    });
  }

  const isPasswordMatching = await verifyPassword(
    existingUser.passwordHash,
    password,
  );

  if (!isPasswordMatching) {
    let attempts = existingUser.failedAttempts || 0;

    // increase failed attempts for wrong password
    attempts += 1;

    // lock account for 15 minutes if failed attempt becomes 5 and more
    if (attempts >= 5) {
      await db
        .update(users)
        .set({
          failedAttempts: 0,
          lockedUntil: new Date(Date.now() + 1000 * 60 * 15),
        })
        .where(eq(users.email, email));

      throw createError({
        statusCode: 403,
        message: "Account locked for 15 minutes",
      });
    }

    // if failed attempt less than 5, update failed attempt
    await db
      .update(users)
      .set({
        failedAttempts: attempts,
      })
      .where(eq(users.email, email));

    throw createError({
      statusCode: 401,
      message: "Invalid credentials",
    });
  }

  if (!existingUser.isVerified) {
    throw createError({
      statusCode: 403,
      message: "Please verify your email first",
    });
  }

  // reset attempts
  await db
    .update(users)
    .set({
      failedAttempts: 0,
      lockedUntil: null,
    })
    .where(eq(users.email, email));

  // rotate sessions
  await db.delete(sessions).where(eq(sessions.userId, existingUser.id));

  const sessionToken = await createAuthSession(existingUser.id);

  setCookie(event, "session", sessionToken, {
    httpOnly: true,
    secure: true,
    sameSite: "strict",
    maxAge: 60 * 60 * 24 * 7,
    path: "/",
  });

  // audit log
  await db.insert(auditLogs).values({
    userId: existingUser.id,
    action: "LOGIN_SUCCESS",
    ip,
  });

  return { success: true, message: "Login successful" };
});
