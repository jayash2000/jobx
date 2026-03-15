import z from "zod";

export const jobPostSchema = z
  .object({
    title: z
      .string()
      .trim()
      .min(1, { message: "Title must not be empty" })
      .max(150, { message: "Title has maximum length of 150 characters" }),

    slug: z
      .string()
      .min(1, { message: "Slug must not be empty" })
      .max(200)
      .regex(/^[a-z0-9-]+$/, {
        message:
          "Slug must contain only lowercase letters, numbers, and hyphens",
      }),

    description: z
      .string()
      .trim()
      .min(1, { message: "Description must not be empty" })
      .max(10000),

    type: z
      .enum(["full-time", "part-time", "contract", "internship", "remote"])
      .default("full-time"),

    location: z
      .string()
      .min(1, { message: "Location must not be empty" })
      .max(150, { message: "Location has maximum length of 150 characters" })
      .trim(),

    locationType: z.enum(["remote", "hybrid", "onsite"]).default("onsite"),

    salaryMin: z.coerce.number().int().min(0).default(0),
    salaryMax: z.coerce.number().int().min(0).default(0),

    status: z.enum(["draft", "active", "paused", "closed"]).default("active"),

    expiresAt: z.coerce.date().optional(),
  })
  .refine((data) => data.salaryMax >= data.salaryMin, {
    message: "Maximum salary must be greater than minimum salary",
    path: ["salaryMax"],
  });

export type JobPostSchema = z.infer<typeof jobPostSchema>;
