import { MultiStepButtons } from '@/components/multi-step-buttons'
import MultiStepForm from '@/components/multi-step-form'
import { OnboardingFormContext } from '@/context/onboarding-multi-step-form'
import { useMultiStepForm } from '@/hooks/use-multi-step-form'

export function OnboardingForm() {
  const { CurrentForm } = useMultiStepForm(OnboardingFormContext)

  return (
    <>
      <MultiStepForm context={OnboardingFormContext}>
        <CurrentForm />
        <MultiStepButtons
          className="mt-8"
          initialStepLabel="Iniciar"
          endStepLabel="Finalizar"
          nextLabel="Próxima pergunta"
          context={OnboardingFormContext}
        />
      </MultiStepForm>
    </>
  )
}
