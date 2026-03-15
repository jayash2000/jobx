import {
  index,
  integer,
  jsonb,
  pgEnum,
  pgTable,
  text,
  timestamp,
  uniqueIndex,
  uuid,
  varchar,
} from "drizzle-orm/pg-core";
import { companies } from "./companies.schema";
import { users } from "./user.schema";

export const jobTypeEnum = pgEnum("job_type", [
  "full-time",
  "part-time",
  "contract",
  "internship",
  "remote",
]);

export const jobStatusEnum = pgEnum("job_status", [
  "draft",
  "active",
  "paused",
  "closed",
]);

export const jobLocationEnum = pgEnum("job_location_type", [
  "remote",
  "hybrid",
  "onsite",
]);

export const applicationStatusEnum = pgEnum("application_status", [
  "pending",
  "reviewing",
  "rejected",
  "accepted",
]);

// Jobs
export const jobs = pgTable(
  "jobs",
  {
    id: uuid("id").defaultRandom().primaryKey(),
    title: varchar("title", { length: 150 }).notNull(),
    description: text("description").notNull(),
    slug: varchar("slug", { length: 200 }).unique().notNull(),
    type: jobTypeEnum("type").notNull().default("full-time"),

    location: varchar("location", { length: 150 }).notNull(),
    locationType: jobLocationEnum("location_type").default("onsite").notNull(),

    salaryMin: integer("salary_min").default(0),
    salaryMax: integer("salary_max").default(0),

    companyId: uuid("company_id")
      .references(() => companies.id, { onDelete: "cascade" })
      .notNull(),
    postedBy: uuid("posted_by")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),

    status: jobStatusEnum("status").default("active").notNull(),

    views: integer("views").default(0).notNull(),

    expiresAt: timestamp("expires_at", { withTimezone: true }),
    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    index("job_company_idx").on(table.companyId),
    index("job_owner_idx").on(table.postedBy),
    index("job_status_idx").on(table.status),
    index("job_location_idx").on(table.location),
    index("job_created_idx").on(table.createdAt),
  ],
);

// Applications for job
export const applications = pgTable(
  "applications",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    jobId: uuid("job_id")
      .references(() => jobs.id, { onDelete: "cascade" })
      .notNull(),
    candidateId: uuid("candidate_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),

    resumeId: uuid("resume_id").references(() => resumes.id, {
      onDelete: "set null",
    }),
    resumeSnapShot: jsonb("resume_snapshot"),
    // resumeSnapShot: resume (later in backend)

    coverLetter: text("cover_letter"),
    status: applicationStatusEnum("status").default("pending").notNull(),

    notes: text("notes"),

    createdAt: timestamp("created_at", { withTimezone: true })
      .defaultNow()
      .notNull(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date())
      .notNull(),
  },
  (table) => [
    uniqueIndex("job_candidate_unique").on(table.jobId, table.candidateId),
    index("application_job_idx").on(table.jobId),
    index("application_candidate_idx").on(table.candidateId),
    index("application_status_idx").on(table.status),
  ],
);

// Resume uploaded in application
export const resumes = pgTable(
  "resumes",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),

    fileUrl: text("file_url").notNull(),

    fileName: text("file_name"),
    mimeType: text("mime_type"),

    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
    updatedAt: timestamp("updated_at", { withTimezone: true })
      .defaultNow()
      .$onUpdate(() => new Date()),
  },
  (table) => [
    index("resume_user_idx").on(table.userId),
    uniqueIndex("resumes_user_id_unique").on(table.userId),
  ],
);

// Saved jobs as bookmarks
export const bookmarks = pgTable(
  "bookmarks",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    userId: uuid("user_id")
      .references(() => users.id, { onDelete: "cascade" })
      .notNull(),

    jobId: uuid("job_id")
      .references(() => jobs.id, { onDelete: "cascade" })
      .notNull(),

    createdAt: timestamp("created_at", { withTimezone: true }).defaultNow(),
  },
  (table) => [
    index("bookmarks_user_idx").on(table.userId),
    index("bookmarks_job_idx").on(table.jobId),
    uniqueIndex("bookmarks_user_job_unique").on(table.userId, table.jobId),
  ],
);

// Job Analytics
export const jobViews = pgTable(
  "job_views",
  {
    id: uuid("id").defaultRandom().primaryKey(),

    jobId: uuid("job_id")
      .references(() => jobs.id, { onDelete: "cascade" })
      .notNull(),

    viewerId: uuid("viewer_id").references(() => users.id, {
      onDelete: "set null",
    }),
    viewedAt: timestamp("viewed_at").defaultNow(),
  },
  (table) => [
    index("job_views_job_idx").on(table.jobId),
    index("job_views_viewed_idx").on(table.viewedAt),
    index("job_views_job_viewed_idx").on(table.jobId, table.viewedAt),
  ],
);
