import { defineConfig } from "drizzle-kit";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) throw Error("Invalid connection string!");

export default defineConfig({
  out: "./server/db/drizzle",
  schema: "./server/db/schema/*",
  dialect: "postgresql",
  dbCredentials: {
    url: databaseUrl,
  },
});
