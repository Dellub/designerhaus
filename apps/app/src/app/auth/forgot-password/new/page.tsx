'use client'

import { forgotPasswordNewSchema } from '@/schema/auth'
import { useNewPasswordMutation } from '@/services/user/use-user-mutation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@workspace/ui/components/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@workspace/ui/components/form'
import { Input } from '@workspace/ui/components/input'
import { Spinner } from '@workspace/ui/components/spinner'
import { Eye, EyeOff } from 'lucide-react'
import { redirect } from 'next/navigation'
import { useMemo, useState } from 'react'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

export default function Page() {
  const { mutateAsync: validateCodeUser, data } = useNewPasswordMutation()

  const form = useForm<z.infer<typeof forgotPasswordNewSchema>>({
    resolver: zodResolver(forgotPasswordNewSchema),
    defaultValues: {
      password: '',
      repeatPassword: '',
      // password: 'ReactJS@001',
      // repeatPassword: 'ReactJS@001',
    },
  })

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form

  async function onSubmit(values: z.infer<typeof forgotPasswordNewSchema>) {
    const { password } = values
    const code = localStorage.getItem('forgotPassword:code')

    const data = {
      email: getEmail(),
      code,
      password,
    }

    await validateCodeUser(data)

    toast.success('Senha alterada com sucesso', {
      description: 'Agora você pode entrar na sua conta',
    })

    redirect('/auth/login')
  }

  function getEmail() {
    if (typeof window !== 'undefined') return window?.localStorage.getItem('forgotPassword:email') ?? ''
  }

  return (
    <main className="w-screen overflow-x-hidden min-h-screen flex flex-col justify-center items-center gap-16 py-10 px-4">
      <h1 className="text-[#4ba3fb] text-3xl font-bold font-manrope leading-none">DesignerHaus</h1>
      <div className="max-w-[426px] w-full p-8 flex flex-col items-center justify-center rounded-[18px] bg-[#fbfbfc]/95 shadow-[inset_0px_2px_0px_0px_currentColor] shadow-white">
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col items-center">
            <h2 className="text-center text-[#1c2024] text-xl font-semibold font-manrope">Esqueceu sua senha?</h2>
            <p className="text-center text-[#667085] text-sm font-normal font-inter">
              Enviamos um e-mail para {getEmail()}. Verifique sua caixa de entrada e siga as instruções para redefinir
              sua senha.
            </p>
          </div>

          <Form {...form}>
            <form onSubmit={handleSubmit(onSubmit)} className="w-full flex flex-col gap-4 -mt-4">
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
                    </FormItem>
                  )
                }}
              />
              <FormField
                control={control}
                name="repeatPassword"
                render={({ field }) => {
                  const [show, setShow] = useState(false)

                  const IconEye = useMemo(() => {
                    return show ? EyeOff : Eye
                  }, [show])

                  return (
                    <FormItem>
                      <FormLabel className="text-[#80838d] text-sm font-normal font-inter leading-tight">
                        Repitir Senha
                      </FormLabel>
                      <FormControl>
                        <div className="flex relative">
                          <Input type={show ? 'text' : 'password'} placeholder="Repita sua senha" {...field} />
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
                    </FormItem>
                  )
                }}
              />

              <Button className="w-full max-h-[52px]" disabled={isSubmitting}>
                {isSubmitting ? <Spinner /> : 'Validar código'}
              </Button>
            </form>
          </Form>

          <span className="text-center text-[#80838d] text-sm font-normal font-inter leading-tight">
            Não recebeu um e-mail?{' '}
            <Button className="font-semibold p-0 text-current hover:no-underline" variant="link" type="button">
              Enviar novamente
            </Button>
          </span>
        </div>
      </div>
    </main>
  )
}
