import 'dotenv/config'
import { buildApp } from './app.js'
import { db } from './db/client.js'

const app = await buildApp(db)

process.on('SIGTERM', () => app.close())
process.on('SIGINT', () => app.close())

await app.listen({ port: Number(process.env.PORT ?? 3000), host: '0.0.0.0' })
