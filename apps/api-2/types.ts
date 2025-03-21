// adding jwt property to req

import type { JWT } from '@fastify/jwt'

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
