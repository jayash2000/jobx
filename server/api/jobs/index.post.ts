import { db } from "~~/server/db";
import { jobs } from "~~/server/db/schema/jobs.schema";
import { generateSlug } from "~~/server/utils/format";
import { jobPostSchema } from "~~/shared/schemas/job";

/*
1. only logged in recruiter can create job
2. validate body
3. check if slug generated here matches with the one in body
4. check if company exists
5. insert in jobs table
*/

export default defineEventHandler(async (event) => {
  const user = requireRole(event, ["recruiter"]);

  const res = await readValidatedBody(event, (body) =>
    jobPostSchema.safeParse(body),
  );

  if (!res.success) {
    throw createError({
      statusCode: 400,
      message: res.error?.issues[0]?.message,
    });
  }

  const {
    title,
    slug,
    description,
    type,
    location,
    locationType,
    salaryMin,
    salaryMax,
    status,
    expiresAt,
  } = res.data;

  const newSlug = generateSlug(title);

  if (slug !== newSlug) {
    throw createError({
      statusCode: 400,
      message: "Invalid slug",
    });
  }

  // TODO: check if company exists

  // TODO: insert data in jobs table
  
});
