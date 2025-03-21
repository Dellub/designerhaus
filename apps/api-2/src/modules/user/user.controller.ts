import { randomInt } from 'node:crypto'
import type {
  CreateUserInput,
  ForgotPasswordUserInput,
  LoginUserInput,
  NewPasswordSchemaUserInput,
  ValidateCodeSchemaUserInput,
} from '@/modules/user/user.schema'
import prisma from '@/utils/prisma'
import * as argon2 from 'argon2'
import type { FastifyInstance, FastifyReply, FastifyRequest } from 'fastify'

const SALT_ROUNDS = 10

export async function createUser(
  req: FastifyRequest<{
    Body: CreateUserInput
  }>,
  reply: FastifyReply,
) {
  const { password, email, phone, firstName, lastName } = req.body
  const user = await prisma.user.findUnique({
    where: {
      email: email,
    },
  })

  if (user) {
    return reply.code(401).send({
      title: 'Algo deu errado',
      message: 'Já existe usuário com este e-mail',
    })
  }

  try {
    const hash = await argon2.hash(password, {
      hashLength: SALT_ROUNDS,
    })

    const user = await prisma.user.create({
      data: {
        password: hash,
        email,
        firstName,
        lastName,
        profile: {
          create: {
            phone,
          },
        },
      },
    })

    return reply.code(201).send(user)
  } catch (e) {
    return reply.code(500).send(e)
  }
}

export async function login(
  req: FastifyRequest<{
    Body: LoginUserInput
  }>,
  reply: FastifyReply,
) {
  const { email, password } = req.body

  const user = await prisma.user.findUnique({ where: { email: email } })

  const isMatch = user && (await argon2.verify(user.password, password))

  if (!user || !isMatch) {
    return reply.code(401).send({
      title: 'Ocorreu um erro',
      message: 'E-mail ou senha inválidos',
    })
  }

  const payload = {
    id: user.id,
    email: user.email,
    firstName: user.firstName,
    lastName: user.lastName,
  }

  const token = req.jwt.sign(payload, {
    expiresIn: '2d',
  })

  reply.setCookie('accessToken', token, {
    // path: '/',
    httpOnly: true,
    secure: true,
  })

  return { accessToken: token }
}

export async function forgotPassword(
  req: FastifyRequest<{
    Body: ForgotPasswordUserInput
  }>,
  reply: FastifyReply,
  fastify: FastifyInstance,
) {
  const { email } = req.body

  const user = await prisma.user.findUnique({ where: { email: email } })

  if (!user) {
    return reply.code(400).send({
      title: 'Algo deu errado',
      message: 'Email inválido',
    })
  }

  const code = randomInt(100000, 999999).toString()

  await prisma.code.create({
    data: {
      code,
      userId: user.id,
    },
  })

  const { mailer } = fastify

  mailer.sendMail(
    {
      to: 'rodrigocgodoy@hotmail.com',
      subject: 'Seu código de recuperação',
      text: `Seu código de recuperação é: ${code}`,
    },
    (errors, info) => {
      if (errors) {
        console.log('errors', errors)
        fastify.log.error(errors)

        reply.status(500).send({
          title: 'Algo deu errado',
          message: 'Por algum motivo não foi possivel enviar um email',
        })
      }

      console.log('info:', info)

      reply.status(200).send({
        message: 'Email successfully sent',
      })
    },
  )
}

export async function validateCode(
  req: FastifyRequest<{
    Body: ValidateCodeSchemaUserInput
  }>,
  reply: FastifyReply,
) {
  const { email, code } = req.body

  const user = await prisma.user.findUnique({ where: { email: email } })

  if (!user) {
    return reply.code(400).send({
      title: 'Algo deu errado',
      message: 'Email inválido',
    })
  }

  const validCode = await prisma.code.findFirst({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  if (!validCode || validCode.code !== code) {
    return reply.code(400).send({
      title: 'Algo deu errado',
      message: 'Código inválido',
    })
  }

  const now = new Date()
  const twentyMinutesAgo = new Date(now.getTime() - 20 * 60 * 1000)

  if (validCode.createdAt < twentyMinutesAgo) {
    return reply.code(400).send({
      title: 'Algo deu errado',
      message: 'O código expirou',
    })
  }

  await prisma.user.update({
    where: {
      id: user.id,
    },
    data: {
      status: 'active',
    },
  })

  return reply.code(200).send({
    message: 'Código validado com sucesso',
  })
}

export async function newPassword(
  req: FastifyRequest<{
    Body: NewPasswordSchemaUserInput
  }>,
  reply: FastifyReply,
) {
  const { email, code, password } = req.body

  const user = await prisma.user.findUnique({ where: { email: email } })

  if (!user) {
    return reply.code(400).send({
      title: 'Algo deu errado',
      message: 'Email inválido',
    })
  }

  const validCode = await prisma.code.findFirst({
    where: {
      userId: user.id,
    },
    orderBy: {
      createdAt: 'desc',
    },
  })

  if (!validCode || validCode.code !== code) {
    return reply.code(400).send({
      title: 'Algo deu errado',
      message: 'Código inválido',
    })
  }

  const isMatch = await argon2.verify(user.password, password)

  if (isMatch) {
    return reply.code(400).send({
      title: 'Algo deu errado',
      message: 'Sua senha não pode ser a mesma atual',
    })
  }

  try {
    const hash = await argon2.hash(password, {
      hashLength: SALT_ROUNDS,
    })

    await prisma.user.update({
      where: {
        id: user.id,
      },
      data: {
        password: hash,
      },
    })

    return reply.code(200).send({
      message: 'Senha atualizada com sucesso',
    })
  } catch (e) {
    return reply.code(500).send(e)
  }
}

export async function getUsers(req: FastifyRequest, reply: FastifyReply) {
  const users = await prisma.user.findMany({
    select: {
      firstName: true,
      lastName: true,
      id: true,
      email: true,
    },
  })

  return reply.code(200).send(users)
}

export async function getMe(req: FastifyRequest, reply: FastifyReply) {
  const user = await prisma.user.findUniqueOrThrow({
    select: {
      firstName: true,
      lastName: true,
      id: true,
      email: true,
    },
    where: {
      id: req.user.id,
    },
  })

  return reply.code(200).send(user)
}

export async function logout(req: FastifyRequest, reply: FastifyReply) {
  reply.clearCookie('accessToken')

  return reply.send({ message: 'Logout successful' })
}
