import Fastify from "fastify";
import cors from "@fastify/cors";
import type { PostgresJsDatabase } from "drizzle-orm/postgres-js";
import type * as schema from "./db/schema.js";
import { authPlugin } from "./plugins/auth.js";
import { projectsRoutes } from "./routes/projects.js";
import { articlesRoutes } from "./routes/articles.js";
import { mediaRoutes } from "./routes/media.js";
import { adminRoutes } from "./routes/admin.js";

type Db = PostgresJsDatabase<typeof schema>;

export async function buildApp(db: Db) {
  const app = Fastify({ logger: false });
  await app.register(cors, { origin: process.env.ALLOWED_ORIGIN ?? "*" });
  await app.register(authPlugin);
  app.decorate("db", db);
  await app.register(projectsRoutes);
  await app.register(articlesRoutes);
  await app.register(mediaRoutes);
  await app.register(adminRoutes);
  return app;
}
