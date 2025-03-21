'use client'

import { loginSchema } from '@/schema/auth'
import { useLoginMutation } from '@/services/user/use-user-mutation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@workspace/ui/components/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@workspace/ui/components/form'
import { Input } from '@workspace/ui/components/input'
import { Spinner } from '@workspace/ui/components/spinner'
import { setCookie } from 'cookies-next'
import { Eye, EyeOff } from 'lucide-react'
import Link from 'next/link'
import { redirect } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

export default function Page() {
  const { mutateAsync: loginUser, data } = useLoginMutation()

  const form = useForm<z.infer<typeof loginSchema>>({
    resolver: zodResolver(loginSchema),
    defaultValues: {
      email: '',
      password: '',
      // email: 'rodrigocgodoy@hotmail.com',
      // password: 'ReactJS@001',
    },
  })

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form

  async function onSubmit(values: z.infer<typeof loginSchema>) {
    const { email, password } = values

    const data = {
      email,
      password,
    }

    // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const result = (await loginUser(data)) as any

    setCookie('designerHaus:accessToken', result.accessToken)

    redirect('/')
  }

  return (
    <main className="w-screen overflow-x-hidden min-h-screen flex flex-col justify-center items-center gap-16 py-10 px-4">
      <h1 className="text-[#4ba3fb] text-3xl font-bold font-manrope leading-none">DesignerHaus</h1>
      <div className="max-w-[426px] w-full p-8 flex flex-col items-center justify-center rounded-[18px] bg-[#fbfbfc]/95 shadow-[inset_0px_2px_0px_0px_currentColor] shadow-white">
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col items-center">
            <h2 className="text-center text-[#1c2024] text-xl font-semibold font-manrope">Bem-vindo de volta</h2>
            <p className="text-center text-[#667085] text-sm font-normal font-inter">
              Faça login para acessar sua conta.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4">
              <FormField
                control={control}
                name="email"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col gap-3">
                    <FormLabel className="text-[#80838d] text-sm font-normal font-inter leading-tight">Email</FormLabel>
                    <FormControl>
                      <Input type="email" placeholder="Digite seu melhor email" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={control}
                name="password"
                render={({ field }) => {
                  const [show, setShow] = useState(false)

                  const IconEye = useMemo(() => {
                    return show ? EyeOff : Eye
                  }, [show])

                  return (
                    <FormItem>
                      <FormLabel className="text-[#80838d] text-sm font-normal font-inter leading-tight">
                        Senha
                      </FormLabel>
                      <FormControl>
                        <div className="flex relative">
                          <Input type={show ? 'text' : 'password'} placeholder="Digite sua senha" {...field} />
                          <button
                            onClick={() => setShow((prevState) => !prevState)}
                            type="button"
                            className="absolute top-1/2 right-6 -translate-y-1/2 cursor-pointer"
                          >
                            <IconEye className="size-5 stroke-[#8b8d98]" />
                          </button>
                        </div>
                      </FormControl>
                      <FormMessage />
                      <FormDescription className="text-end text-[#8b8d98] text-sm font-normal font-inter underline leading-tight">
                        <Link href={'/auth/forgot-password'}>Esqueci minha senha</Link>
                      </FormDescription>
                    </FormItem>
                  )
                }}
              />
              <Button className="w-full max-h-[52px]" disabled={isSubmitting}>
                {isSubmitting ? <Spinner /> : 'Acessar'}
              </Button>
            </form>
          </Form>

          <span className="text-center text-[#80838d] text-sm font-normal font-inter leading-tight">
            Não tem uma conta?{' '}
            <Link className="font-semibold" href="/auth/register">
              Cadastrar-se
            </Link>
          </span>
        </div>
      </div>
    </main>
  )
}
