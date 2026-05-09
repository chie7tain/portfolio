import type { FastifyInstance } from 'fastify'
import { eq, sql, asc } from 'drizzle-orm'
import { projects } from '../db/schema.js'

export async function projectsRoutes(fastify: FastifyInstance) {
  fastify.get('/projects', async () => {
    return fastify.db
      .select()
      .from(projects)
      .where(eq(projects.published, true))
      .orderBy(asc(projects.displayOrder), asc(projects.createdAt))
  })

  fastify.get<{ Params: { id: string } }>(
    '/projects/:id',
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
      const [project] = await fastify.db
        .select()
        .from(projects)
        .where(eq(projects.id, request.params.id))
      if (!project || !project.published) return reply.code(404).send({ error: 'Not found' })
      return project
    },
  )

  fastify.post<{ Body: { title: string; link: string; image: string; description?: string; published?: boolean; displayOrder?: number } }>(
    '/projects',
    {
      schema: {
        body: {
          type: 'object',
          required: ['title', 'link', 'image'],
          properties: {
            title: { type: 'string' },
            link: { type: 'string' },
            image: { type: 'string' },
            description: { type: 'string' },
            published: { type: 'boolean' },
            displayOrder: { type: 'integer' },
          },
        },
      },
    },
    async (request, reply) => {
      const { title, link, image, description, published = false, displayOrder } = request.body

      let nextOrder = displayOrder
      if (nextOrder === undefined) {
        const [{ max }] = await fastify.db
          .select({ max: sql<number | null>`MAX(display_order)` })
          .from(projects)
        nextOrder = (max ?? 0) + 1
      }

      const [created] = await fastify.db
        .insert(projects)
        .values({ title, link, image, description, published, displayOrder: nextOrder })
        .returning()
      return reply.code(201).send(created)
    },
  )

  fastify.patch<{ Params: { id: string }; Body: { title?: string; link?: string; image?: string; description?: string; published?: boolean; displayOrder?: number } }>(
    '/projects/:id',
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
            link: { type: 'string' },
            image: { type: 'string' },
            description: { type: 'string' },
            published: { type: 'boolean' },
            displayOrder: { type: 'integer' },
          },
        },
      },
    },
    async (request, reply) => {
      const updates: Partial<typeof projects.$inferInsert> = {}
      const b = request.body
      if (b.title !== undefined) updates.title = b.title
      if (b.link !== undefined) updates.link = b.link
      if (b.image !== undefined) updates.image = b.image
      if (b.description !== undefined) updates.description = b.description
      if (b.published !== undefined) updates.published = b.published
      if (b.displayOrder !== undefined) updates.displayOrder = b.displayOrder

      const [updated] = await fastify.db
        .update(projects)
        .set(updates)
        .where(eq(projects.id, request.params.id))
        .returning()
      if (!updated) return reply.code(404).send({ error: 'Not found' })
      return updated
    },
  )

  fastify.delete<{ Params: { id: string } }>(
    '/projects/:id',
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
      await fastify.db.delete(projects).where(eq(projects.id, request.params.id))
      return reply.code(204).send()
    },
  )
}
