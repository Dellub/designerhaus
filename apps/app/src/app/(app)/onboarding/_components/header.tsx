import { OnboardingFormContext } from '@/context/onboarding-multi-step-form'
import { useMultiStepForm } from '@/hooks/use-multi-step-form'

export function OnboardingHeader() {
  const { currentStepTitle, currentStepDescription } = useMultiStepForm(OnboardingFormContext)

  return (
    <div className="flex flex-col items-center">
      <h2 className="text-center text-[#1c2024] text-xl font-semibold font-manrope">{currentStepTitle}</h2>
      <p className="text-center text-[#667085] text-sm font-normal font-inter">{currentStepDescription}</p>
    </div>
  )
}
