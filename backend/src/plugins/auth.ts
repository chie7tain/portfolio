import fp from 'fastify-plugin'

export const authPlugin = fp(async (fastify) => {
  fastify.addHook('preHandler', async (request, reply) => {
    const isAdminRoute = request.url.startsWith('/admin')
    if (!isAdminRoute && (request.method === 'GET' || request.method === 'HEAD')) return
    const key = request.headers['x-api-key']
    if (!key || key !== process.env.API_KEY) {
      return reply.code(401).send({ error: 'Unauthorized' })
    }
  })
})
