import type { PostgresJsDatabase } from 'drizzle-orm/postgres-js'
import type * as schema from '../db/schema.js'

declare module 'fastify' {
  interface FastifyInstance {
    db: PostgresJsDatabase<typeof schema>
  }
}
