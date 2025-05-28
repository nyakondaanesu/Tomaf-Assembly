import { config } from "dotenv";

config({ path: ".env.local" });

export default {
  schema: "./app/db/schema.ts",
  out: "./drizzle",
  dialect: "postgresql",
  dbCredentials: {
    url: process.env.DATABASE_URL!, // use 'url' key here
  },
};
