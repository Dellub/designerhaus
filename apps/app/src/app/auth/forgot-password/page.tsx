'use client'

import { forgotPasswordSchema } from '@/schema/auth'
import { useForgotPasswordMutation } from '@/services/user/use-user-mutation'
import { zodResolver } from '@hookform/resolvers/zod'
import { Button } from '@workspace/ui/components/button'
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@workspace/ui/components/form'
import { Input } from '@workspace/ui/components/input'
import { Spinner } from '@workspace/ui/components/spinner'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { toast } from 'sonner'
import type { z } from 'zod'

export default function Page() {
  const router = useRouter()
  const { mutateAsync: forgotPasswordUser } = useForgotPasswordMutation()

  const form = useForm<z.infer<typeof forgotPasswordSchema>>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: 'rodrigocgodoy@hotmail.com',
    },
  })

  const {
    handleSubmit,
    control,
    formState: { isSubmitting },
  } = form

  async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
    const { email } = values

    const data = {
      email,
    }

    await forgotPasswordUser(data)

    toast.success('Sua solicitação foi enviada. Por favor, verifique seu e-mail.')

    localStorage.setItem('forgotPassword:email', values.email)

    router.push('/auth/forgot-password/code')
  }

  return (
    <main className="w-screen overflow-x-hidden min-h-screen flex flex-col justify-center items-center gap-16 py-10 px-4">
      <h1 className="text-[#4ba3fb] text-3xl font-bold font-manrope leading-none">DesignerHaus</h1>
      <div className="max-w-[426px] w-full p-8 flex flex-col items-center justify-center rounded-[18px] bg-[#fbfbfc]/95 shadow-[inset_0px_2px_0px_0px_currentColor] shadow-white">
        <div className="w-full flex flex-col gap-8">
          <div className="flex flex-col items-center">
            <h2 className="text-center text-[#1c2024] text-xl font-semibold font-manrope">Esqueceu sua senha?</h2>
            <p className="text-center text-[#667085] text-sm font-normal font-inter">
              Insira seu e-mail abaixo e lhe enviaremos um código
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
              <Button className="w-full max-h-[52px]" disabled={isSubmitting}>
                {isSubmitting ? <Spinner /> : 'Enviar email'}
              </Button>
            </form>
          </Form>

          <span className="text-center text-[#80838d] text-sm font-normal font-inter leading-tight">
            Lembra da sua senha?{' '}
            <Link className="font-semibold" href="/login">
              Voltar para Login
            </Link>
          </span>
        </div>
      </div>
    </main>
  )
}
