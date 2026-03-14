import { drizzle } from "drizzle-orm/node-postgres";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) throw new Error("Error connecting database");

export const db = drizzle(databaseUrl);
