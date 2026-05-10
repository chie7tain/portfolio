import type { FastifyInstance } from 'fastify'
import { asc, desc } from 'drizzle-orm'
import { projects, articles, mediaItems } from '../db/schema.js'

export async function adminRoutes(fastify: FastifyInstance) {
  fastify.get('/admin/projects', async () =>
    fastify.db.select().from(projects).orderBy(asc(projects.displayOrder), asc(projects.createdAt))
  )

  fastify.get('/admin/articles', async () =>
    fastify.db.select().from(articles).orderBy(desc(articles.createdAt))
  )

  fastify.get('/admin/media', async () =>
    fastify.db.select().from(mediaItems).orderBy(desc(mediaItems.createdAt))
  )
}
