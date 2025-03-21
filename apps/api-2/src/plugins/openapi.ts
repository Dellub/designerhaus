import swagger from '@fastify/swagger'
import fp from 'fastify-plugin'

export default fp(async (fastify) => {
  fastify.register(swagger)
})
