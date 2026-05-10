import type { FastifyInstance } from 'fastify'
import { eq, desc } from 'drizzle-orm'
import { articles } from '../db/schema.js'

export async function articlesRoutes(fastify: FastifyInstance) {
  fastify.get('/articles', async () => {
    return fastify.db
      .select()
      .from(articles)
      .where(eq(articles.published, true))
      .orderBy(desc(articles.publishedAt))
  })

  fastify.get<{ Params: { id: string } }>(
    '/articles/:id',
    {
      schema: {
        params: {
          type: 'object',
          properties: { id: { type: 'string', format: 'uuid' } },
          required: ['id'],
        },
      },
    },
    async (request, reply) => {
      const [article] = await fastify.db
        .select()
        .from(articles)
        .where(eq(articles.id, request.params.id))
      if (!article || !article.published) return reply.code(404).send({ error: 'Not found' })
      return article
    },
  )

  fastify.post<{ Body: { title: string; body: string; published?: boolean; publishedAt?: string } }>(
    '/articles',
    {
      schema: {
        body: {
          type: 'object',
          required: ['title', 'body'],
          properties: {
            title: { type: 'string' },
            body: { type: 'string' },
            published: { type: 'boolean' },
            publishedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
    async (request, reply) => {
      const { title, body, published = false, publishedAt } = request.body

      if (published && !publishedAt) {
        return reply.code(400).send({ error: 'publishedAt is required when published is true' })
      }

      const [created] = await fastify.db
        .insert(articles)
        .values({
          title,
          body,
          published,
          publishedAt: publishedAt ? new Date(publishedAt) : null,
        })
        .returning()
      return reply.code(201).send(created)
    },
  )

  fastify.patch<{ Params: { id: string }; Body: { title?: string; body?: string; published?: boolean; publishedAt?: string } }>(
    '/articles/:id',
    {
      schema: {
        params: {
          type: 'object',
          properties: { id: { type: 'string', format: 'uuid' } },
          required: ['id'],
        },
        body: {
          type: 'object',
          properties: {
            title: { type: 'string' },
            body: { type: 'string' },
            published: { type: 'boolean' },
            publishedAt: { type: 'string', format: 'date-time' },
          },
        },
      },
    },
    async (request, reply) => {
      const b = request.body
      const [existing] = await fastify.db
        .select()
        .from(articles)
        .where(eq(articles.id, request.params.id))
      if (!existing) return reply.code(404).send({ error: 'Not found' })

      const willBePublished = b.published !== undefined ? b.published : existing.published
      const resolvedPublishedAt = b.publishedAt !== undefined ? b.publishedAt : existing.publishedAt
      if (willBePublished && !resolvedPublishedAt) {
        return reply.code(400).send({ error: 'publishedAt is required when published is true' })
      }

      const updates: Partial<typeof articles.$inferInsert> = {}
      if (b.title !== undefined) updates.title = b.title
      if (b.body !== undefined) updates.body = b.body
      if (b.published !== undefined) updates.published = b.published
      if (b.publishedAt !== undefined) updates.publishedAt = b.publishedAt ? new Date(b.publishedAt) : null

      const [updated] = await fastify.db
        .update(articles)
        .set(updates)
        .where(eq(articles.id, request.params.id))
        .returning()
      return updated
    },
  )

  fastify.delete<{ Params: { id: string } }>(
    '/articles/:id',
    {
      schema: {
        params: {
          type: 'object',
          properties: { id: { type: 'string', format: 'uuid' } },
          required: ['id'],
        },
      },
    },
    async (request, reply) => {
      await fastify.db.delete(articles).where(eq(articles.id, request.params.id))
      return reply.code(204).send()
    },
  )
}
