'use client'

import { useMultiStepForm } from '@/hooks/use-multi-step-form'
import type { UseMultiStepFormTypeOptions } from '@/types/multi-step-form'
import { Form } from '@workspace/ui/components/form'
import type React from 'react'
import type { PropsWithChildren } from 'react'

interface Props extends PropsWithChildren {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  context: React.Context<UseMultiStepFormTypeOptions<any>>
}

const MultiStepForm = ({ children, context }: Props) => {
  const { form, onSubmit, onErrors } = useMultiStepForm(context)

  return (
    <Form {...form}>
      <form onSubmit={form?.handleSubmit(onSubmit, onErrors)}>
        <div className="flex flex-col gap-2">{children}</div>
      </form>
    </Form>
  )
}

export default MultiStepForm
