'use client'

import { forgotPasswordCodeSchema } from '@/schema/auth'
import { useValidateCodeMutation } from '@/services/user/use-user-mutation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@workspace/ui/components/button'
import { Form, FormControl, FormField, FormItem, FormMessage } from '@workspace/ui/components/form'
import { InputOTP, InputOTPGroup, InputOTPSlot } from '@workspace/ui/components/input-otp'
import { Spinner } from '@workspace/ui/components/spinner'
import { redirect } from 'next/navigation'
import { useForm } from 'react-hook-form'
import type { z } from 'zod'

export default function Page() {
  const { mutateAsync: validateCodeUser, data } = useValidateCodeMutation()

  const form = useForm<z.infer<typeof forgotPasswordCodeSchema>>({
    resolver: zodResolver(forgotPasswordCodeSchema),
    defaultValues: {
      code: '',
    },
  })

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form

  async function onSubmit(values: z.infer<typeof forgotPasswordCodeSchema>) {
    const { code } = values

    localStorage.setItem('forgotPassword:code', code)

    const data = {
      email: getEmail(),
      code,
    }

    await validateCodeUser(data)

    redirect('/auth/forgot-password/new')
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
                name="code"
                render={({ field }) => (
                  <FormItem className="w-full flex flex-col gap-3">
                    <FormControl>
                      <InputOTP maxLength={6} {...field}>
                        <InputOTPGroup>
                          <InputOTPSlot index={0} />
                          <InputOTPSlot index={1} />
                          <InputOTPSlot index={2} />
                          <InputOTPSlot index={3} />
                          <InputOTPSlot index={4} />
                          <InputOTPSlot index={5} />
                        </InputOTPGroup>
                      </InputOTP>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
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
