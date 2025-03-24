// adding jwt property to req

import type { JWT } from '@fastify/jwt'
import { z } from 'zod'

// authenticate property to FastifyInstance
declare module 'fastify' {
  interface FastifyRequest {
    jwt: JWT
  }
  export interface FastifyInstance {
    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    authenticate: any
  }
}

type UserPayload = {
  id: string
  email: string
  name: string
}

declare module '@fastify/jwt' {
  interface FastifyJWT {
    user: UserPayload
  }
}

const envSchema = z.object({
  PORT: z
    .string()
    .transform((port) => Number.parseInt(port, 10))
    .pipe(z.number().int().positive().min(1).max(65535)),
})

// Tipo inferido do schema
export type EnvVars = z.infer<typeof envSchema>

// Validação
export const envValidation = envSchema.parse(process.env)

// Uso
const port: number = envValidation.PORT
