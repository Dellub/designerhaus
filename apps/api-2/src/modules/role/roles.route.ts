import { createRole } from '@/modules/role/roles.controller'
import { $ref } from '@/modules/role/roles.schema'
import type { FastifyInstance } from 'fastify'

export async function roleRoutes(fastify: FastifyInstance) {
  fastify.post(
    '/create',
    {
      preHandler: [fastify.authenticate],
      schema: {
        body: $ref('createRoleSchema'),
        response: {
          201: $ref('createRoleResponseSchema'),
        },
      },
    },
    createRole,
  )
  fastify.log.info('Role routes registered')
}
