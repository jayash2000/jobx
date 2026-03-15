import z from "zod";

export const companyPostSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, { message: "Title must not be empty" })
    .max(100, { message: "Title has maximum length of 100 characters" }),

  slug: z
    .string()
    .trim()
    .min(1, { message: "Slug must not be empty" })
    .max(200)
    .regex(/^[a-z0-9-]+$/, {
      message: "Slug must contain only lowercase letters, numbers, and hyphens",
    }),

  description: z
    .string()
    .trim()
    .min(1, { message: "Description must not be empty" })
    .max(10000),

  location: z
    .string()
    .min(1, { message: "Please enter your company location" })
    .max(100, { message: "Location has maximum length of 150 characters" })
    .trim(),

  website: z.string().max(100, { message: "Too long" }).optional(),

  logoUrl: z.string().optional(),
});

export type CompanyPostSchema = z.infer<typeof companyPostSchema>;
