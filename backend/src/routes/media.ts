import type { FastifyInstance } from 'fastify'
import { eq, desc } from 'drizzle-orm'
import { mediaItems } from '../db/schema.js'

export async function mediaRoutes(fastify: FastifyInstance) {
  fastify.get('/media', async () => {
    return fastify.db
      .select()
      .from(mediaItems)
      .where(eq(mediaItems.published, true))
      .orderBy(desc(mediaItems.createdAt))
  })

  fastify.get<{ Params: { id: string } }>(
    '/media/:id',
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
      const [item] = await fastify.db
        .select()
        .from(mediaItems)
        .where(eq(mediaItems.id, request.params.id))
      if (!item || !item.published) return reply.code(404).send({ error: 'Not found' })
      return item
    },
  )

  fastify.post<{ Body: { title: string; thumbnail: string; link: string; type: string; published?: boolean } }>(
    '/media',
    {
      schema: {
        body: {
          type: 'object',
          required: ['title', 'thumbnail', 'link', 'type'],
          properties: {
            title: { type: 'string' },
            thumbnail: { type: 'string' },
            link: { type: 'string' },
            type: { type: 'string', enum: ['podcast', 'video'] },
            published: { type: 'boolean' },
          },
        },
      },
    },
    async (request, reply) => {
      const { title, thumbnail, link, type, published = false } = request.body
      const [created] = await fastify.db
        .insert(mediaItems)
        .values({ title, thumbnail, link, type, published })
        .returning()
      return reply.code(201).send(created)
    },
  )

  fastify.patch<{ Params: { id: string }; Body: { title?: string; thumbnail?: string; link?: string; type?: string; published?: boolean } }>(
    '/media/:id',
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
            thumbnail: { type: 'string' },
            link: { type: 'string' },
            type: { type: 'string', enum: ['podcast', 'video'] },
            published: { type: 'boolean' },
          },
        },
      },
    },
    async (request, reply) => {
      const updates: Partial<typeof mediaItems.$inferInsert> = {}
      const b = request.body
      if (b.title !== undefined) updates.title = b.title
      if (b.thumbnail !== undefined) updates.thumbnail = b.thumbnail
      if (b.link !== undefined) updates.link = b.link
      if (b.type !== undefined) updates.type = b.type
      if (b.published !== undefined) updates.published = b.published

      const [updated] = await fastify.db
        .update(mediaItems)
        .set(updates)
        .where(eq(mediaItems.id, request.params.id))
        .returning()
      if (!updated) return reply.code(404).send({ error: 'Not found' })
      return updated
    },
  )

  fastify.delete<{ Params: { id: string } }>(
    '/media/:id',
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
      await fastify.db.delete(mediaItems).where(eq(mediaItems.id, request.params.id))
      return reply.code(204).send()
    },
  )
}
