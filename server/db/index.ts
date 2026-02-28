import { drizzle } from "drizzle-orm/node-postgres";

const databaseUrl = process.env.DATABASE_URL;

if (!databaseUrl) throw Error("Error connecting database");

export const db = drizzle(databaseUrl);
