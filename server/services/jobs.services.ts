import { JobPostSchema } from "~~/shared/schemas/job";
import { db } from "../db";
import { jobs } from "../db/schema/jobs.schema";

// export async function createJob(data: JobPostSchema, recruiterId: string) {
//   await db.insert(jobs).values({ ...data, postedBy: recruiterId });
// }
