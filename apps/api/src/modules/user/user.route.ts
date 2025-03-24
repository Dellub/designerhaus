import type { FastifyInstance, FastifyRequest } from 'fastify'
import {
  createUser,
  forgotPassword,
  getMe,
  getUsers,
  login,
  logout,
  newPassword,
  validateCode,
} from './user.controller'
import { $ref, type ForgotPasswordUserInput } from './user.schema'

export async function userRoutes(fastify: FastifyInstance) {
  fastify.get(
    '/',
    {
      preHandler: [fastify.authenticate],
    },
    getUsers,
  )
  fastify.get(
    '/me',
    {
      preHandler: [fastify.authenticate],
    },
    getMe,
  )
  fastify.post(
    '/auth/register',
    {
      schema: {
        body: $ref('createUserSchema'),
        response: {
          201: $ref('createUserResponseSchema'),
        },
      },
    },
    createUser,
  )
  fastify.post(
    '/auth/login',
    {
      schema: {
        body: $ref('loginSchema'),
        response: {
          201: $ref('loginResponseSchema'),
        },
      },
    },
    login,
  )
  fastify.post(
    '/auth/forgot-password',
    {
      schema: {
        body: $ref('forgotPasswordSchema'),
        response: {
          201: $ref('forgotPasswordResponseSchema'),
        },
      },
    },
    (
      req: FastifyRequest<{
        Body: ForgotPasswordUserInput
      }>,
      res,
    ) => forgotPassword(req, res, fastify),
  )
  fastify.post(
    '/auth/validate-code',
    {
      schema: {
        body: $ref('validateCodeSchema'),
        response: {
          201: $ref('validateCodeResponseSchema'),
        },
      },
    },
    validateCode,
  )
  fastify.post(
    '/auth/new-password',
    {
      schema: {
        body: $ref('newPasswordSchema'),
        response: {
          201: $ref('newPasswordResponseSchema'),
        },
      },
    },
    newPassword,
  )
  fastify.delete('/auth/logout', { preHandler: [fastify.authenticate] }, logout)
  fastify.log.info('User routes registered')
}
