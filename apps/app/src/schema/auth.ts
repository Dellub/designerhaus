import { z } from 'zod'

export const loginSchema = z.object({
  email: z.string().email('Por favor, digite um email válido').min(2).max(50),
  password: z.string().min(2).max(50),
})

export const registerSchema = z
  .object({
    fullName: z
      .string()
      .min(3, 'O nome completo deve ter no mínimo 3 caracteres')
      .max(100, 'O nome completo deve ter no máximo 100 caracteres'),
    email: z.string().email('Por favor, digite um email válido').min(2).max(50),
    phone: z
      .string()
      .min(10, 'Telefone deve ter no mínimo 10 dígitos')
      .max(15, 'Telefone deve ter no máximo 15 dígitos'),
    password: z
      .string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .max(50, 'A senha deve ter no máximo 50 caracteres'),
    repeatPassword: z
      .string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .max(50, 'A senha deve ter no máximo 50 caracteres'),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'As senhas não coincidem',
    path: ['repeatPassword'],
  })

export const forgotPasswordSchema = z.object({
  email: z.string().email('Por favor, digite um email válido').min(2).max(50),
})

export const forgotPasswordCodeSchema = z.object({
  code: z.string().min(6).max(6),
})

export const forgotPasswordNewSchema = z
  .object({
    password: z
      .string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .max(50, 'A senha deve ter no máximo 50 caracteres'),
    repeatPassword: z
      .string()
      .min(6, 'A senha deve ter no mínimo 6 caracteres')
      .max(50, 'A senha deve ter no máximo 50 caracteres'),
  })
  .refine((data) => data.password === data.repeatPassword, {
    message: 'As senhas não coincidem',
    path: ['repeatPassword'],
  })
