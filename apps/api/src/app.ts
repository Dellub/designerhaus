// import fMailer from '@dzangolab/fastify-mailer'
import fCookie from '@fastify/cookie'
import cors from '@fastify/cors'
import fjwt, { type FastifyJWT } from '@fastify/jwt'
import Fastify, { type FastifyReply, type FastifyRequest } from 'fastify'
import { envValidation } from '../types'
import { userRoutes } from './modules/user/user.route'
import { userSchemas } from './modules/user/user.schema'
// import mailerConfig from '@/config/mailer'

const fastify = Fastify({ logger: true })

const start = async () => {
  await fastify.register(cors, {
    hook: 'preHandler',
    origin: '*',
  })

  // jwt
  fastify.register(fjwt, { secret: process.env.JWT || '' })
  fastify.addHook('preHandler', (req, res, next) => {
    // here we are
    req.jwt = fastify.jwt
    return next()
  })

  // mailer
  // fastify.register(fMailer, mailerConfig)

  // cookies
  fastify.register(fCookie, {
    secret: 'designerHaus',
    hook: 'preHandler',
  })

  fastify.decorate('authenticate', async (req: FastifyRequest, reply: FastifyReply) => {
    const tokenHeader = req.headers.authorization

    console.log(tokenHeader?.replace('Bearer ', ''))

    if (!tokenHeader) {
      return reply.status(401).send({ message: 'Authentication required' })
    }

    try {
      const decoded = req.jwt.verify<FastifyJWT['user']>(tokenHeader.replace('Bearer ', ''))
      req.user = decoded
    } catch (error) {
      return reply.status(401).send({ message: 'Authentication required' })
    }
  })

  for (const schema of [...userSchemas]) {
    fastify.addSchema(schema)
  }

  fastify.get('/healthcheck', (req, res) => {
    res.send({ message: 'Success' })
  })

  fastify.register(userRoutes, { prefix: 'users' })

  console.log('envValidation', envValidation)
  console.log('PORT', envValidation.PORT)

  try {
    await fastify.listen({ port: envValidation.PORT || 9000, host: '0.0.0.0' })
  } catch (err) {
    fastify.log.error(err)
    process.exit(1)
  }
}

start()

const listeners = ['SIGINT', 'SIGTERM']

for (const signal of listeners) {
  process.on(signal, async () => {
    await fastify.close()
    process.exit(0)
  })
}
