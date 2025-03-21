import type { CreateRoleInput } from '@/modules/role/roles.schema'
import prisma from '@/utils/prisma'
import type { FastifyReply, FastifyRequest } from 'fastify'

export async function createRole(
  req: FastifyRequest<{
    Body: CreateRoleInput
  }>,
  reply: FastifyReply,
) {
  const { name } = req.body

  const role = await prisma.role.findUnique({
    where: {
      name,
    },
  })

  if (role) {
    return reply.code(401).send({
      message: 'Role already exists with this name',
    })
  }

  try {
    const role = await prisma.role.create({
      data: {
        name,
      },
    })

    return reply.code(201).send(role)
  } catch (e) {
    return reply.code(500).send(e)
  }
}
