'use client'

import { useMultiStepForm } from '@/hooks/use-multi-step-form'
import type { UseMultiStepFormTypeOptions } from '@/types/multi-step-form'
import { Button } from '@workspace/ui/components/button'
import { cn } from '@workspace/ui/lib/utils'
import { type Context, useMemo } from 'react'

interface MultiStepButtonsProps<T> {
  previousLabel?: string
  nextLabel: string
  initialStepLabel: string
  endStepLabel: string
  context: Context<T>
  debug?: boolean
  className?: string
}

// biome-ignore lint: must be any as it is a any object
export function MultiStepButtons<T extends UseMultiStepFormTypeOptions<any>>({
  previousLabel,
  nextLabel,
  initialStepLabel,
  endStepLabel,
  debug = false,
  context,
  className,
}: MultiStepButtonsProps<T>) {
  const { currentStep, isFirstStep, isLastStep, goToStep, previousStep } = useMultiStepForm(context)

  const labelNextCurrent = useMemo(() => {
    switch (true) {
      case isFirstStep:
        return initialStepLabel
      case isLastStep:
        return endStepLabel
      default:
        return nextLabel
    }
  }, [isFirstStep, isLastStep, initialStepLabel, endStepLabel, nextLabel])

  return (
    <div className={cn('flex flex-row w-full justify-between', className)}>
      {debug && (
        <pre className="flex justify-center items-center absolute w-32 h-32 right-2 bottom-2 bg-yellow-400 text-black text-sm border-2 rounded-md">{`Current Step: ${currentStep}`}</pre>
      )}
      {previousLabel && (
        <Button
          variant="secondary"
          onClick={() => {
            previousStep()
          }}
          type="button"
          className={cn('visible', {
            invisible: isFirstStep,
          })}
        >
          {previousLabel}
        </Button>
      )}
      <Button className="w-full max-h-[52px]" variant="default" type="submit">
        {labelNextCurrent}
      </Button>
    </div>
  )
}
