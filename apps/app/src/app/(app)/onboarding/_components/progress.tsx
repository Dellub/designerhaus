import { OnboardingFormContext } from '@/context/onboarding-multi-step-form'
import { useMultiStepForm } from '@/hooks/use-multi-step-form'
import { Button } from '@workspace/ui/components/button'
import { Flame } from '@workspace/ui/components/flame'
import { cn } from '@workspace/ui/lib/utils'
import { CircleArrowLeft } from 'lucide-react'

export function OnboardingProgress() {
  const { isFirstStep, previousStep, steps, currentStep } = useMultiStepForm(OnboardingFormContext)

  const percentage = (currentStep * 100) / (steps - 1)

  console.log(steps, currentStep)

  return (
    <div className="flex items-center transition-all">
      <Button
        className={cn('visible p-0', {
          invisible: isFirstStep,
        })}
        variant="link"
        onClick={previousStep}
      >
        <CircleArrowLeft className="min-w-6 min-h-6 stroke-[#398cf8]" />
      </Button>

      <div className="relative h-3 w-full rounded-full bg-[repeating-linear-gradient(-45deg,rgba(146,203,254,.3),rgba(146,203,254,.3)_2px,transparent_2px,transparent_7px)]">
        <div
          style={{
            width: `${percentage}%`,
          }}
          className="absolute top-0 bottom-0 left-0 right-0 rounded-full bg-gradient-to-bl from-[#005cb8] to-[#4ba3fb] shadow-[inset_-1.240121603012085px_-1.240121603012085px_0px_0px_rgba(0,142,244,1.00),_inset_0.4133738577365875px_1.240121603012085px_0px_0px_rgba(166,234,255,1.00)]"
        >
          <Flame className="absolute -right-4 top-1/2 -translate-y-1/2 w-10 h-10" />
        </div>
      </div>
    </div>
  )
}
