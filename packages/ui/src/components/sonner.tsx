'use client'

import { Ban, CircleCheck, CircleX } from 'lucide-react'
import { Toaster as Sonner, type ToasterProps } from 'sonner'

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="light"
      className="toaster group bg-amber-400"
      position="bottom-center"
      icons={{
        error: <CircleX className="stroke-red-500" />,
        success: <CircleCheck className="stroke-green-500" />,
      }}
      toastOptions={{
        classNames: {
          error: '!border-red-500',
          success: '!border-green-500',
          toast:
            'group toast group-[.toaster]:text-foreground group-[.toaster]:border-border group-[.toaster]:shadow-md flex items-center !gap-4',
          title: 'text-sm font-bold font-manrope',
          description: 'text-xs font-bold font-manrope',
          actionButton: 'group-[.toast]:bg-primary group-[.toast]:text-primary-foreground font-medium',
          cancelButton: 'group-[.toast]:bg-muted group-[.toast]:text-muted-foreground font-medium',
        },
      }}
      {...props}
    />
  )
}

export { Toaster }
