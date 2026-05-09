import postgres from 'postgres'
import { drizzle } from 'drizzle-orm/postgres-js'
import * as schema from '../../src/db/schema.js'

const sql = postgres(process.env.TEST_DATABASE_URL!)
export const testDb = drizzle(sql, { schema })

export async function truncateAll() {
  await sql`TRUNCATE projects, articles, media_items RESTART IDENTITY CASCADE`
}

export async function closeTestPool() {
  await sql.end()
}
