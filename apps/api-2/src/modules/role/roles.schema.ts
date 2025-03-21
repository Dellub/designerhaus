import { buildJsonSchemas } from 'fastify-zod'
import { z } from 'zod'

// data that we need from user to register
const createRoleSchema = z.object({
  name: z.string(),
})
//exporting the type to provide to the request Body
export type CreateRoleInput = z.infer<typeof createRoleSchema>

// response schema for registering user
const createRoleResponseSchema = z.object({
  id: z.string(),
})

// to build our JSON schema, we use buildJsonSchemas from fastify-zod
// it returns all the schemas to register and a ref to refer these schemas
export const { schemas: roleSchemas, $ref } = buildJsonSchemas(
  {
    createRoleSchema,
    createRoleResponseSchema,
  },
  {
    $id: 'role',
  },
)
