import { config } from 'dotenv'
import { resolve } from 'path'
import { fileURLToPath } from 'url'
import postgres from 'postgres'
import { exec } from 'child_process'
import { promisify } from 'util'

const execAsync = promisify(exec)

// Load .env.test before anything else — globalSetup runs before Vitest's envFiles
const __dirname = fileURLToPath(new URL('.', import.meta.url))
config({ path: resolve(__dirname, '../.env.test') })

export async function setup() {
  const url = process.env.TEST_DATABASE_URL
  if (!url) throw new Error('TEST_DATABASE_URL not set — create backend/.env.test')
  if (!url.includes('test')) {
    throw new Error('TEST_DATABASE_URL must reference a test database (URL must contain "test")')
  }

  // Create test DB if it doesn't exist
  const parsed = new URL(url)
  const dbName = parsed.pathname.slice(1)
  const adminUrl = `${parsed.protocol}//${parsed.username}:${parsed.password}@${parsed.host}/postgres`
  const admin = postgres(adminUrl)
  await admin.unsafe(`CREATE DATABASE "${dbName}"`).catch(() => {
    // Already exists — ignore
  })
  await admin.end()

  // Apply schema via drizzle-kit push
  await execAsync('npx drizzle-kit push --force', {
    cwd: process.cwd(),
    env: { ...process.env, DATABASE_URL: url },
  })
}
