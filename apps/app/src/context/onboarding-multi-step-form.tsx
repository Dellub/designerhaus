import { Step1 } from '@/app/(app)/onboarding/_components/step-1'
import { Step2 } from '@/app/(app)/onboarding/_components/step-2'
import buildMultiStepForm from '@/lib/multi-step-form'
import type { Form, UseMultiStepFormTypeOptions } from '@/types/multi-step-form'
import type { SubmitHandler } from 'react-hook-form'
import { z } from 'zod'

//  1 - Define the full fields for the entire form
export const CampaignFormSchema = z.object({
  name: z.string().min(5),
  role: z.string().min(5),
  knowledge: z.string().min(5),
  youFindUs: z.string().min(5),
  youUse: z.string().min(5),
})

//  2 - create the type
export type CampaignFormType = z.infer<typeof CampaignFormSchema>

//  3 - Initial Data for fields
export const initialFormData: CampaignFormType = {
  name: '',
  role: '',
  knowledge: '',
  youFindUs: '',
  youUse: '',
}

//  4 - Define the final end step submit function
const saveFormData: SubmitHandler<CampaignFormType> = async (values) => {
  console.log('Your custom save function')
  console.log(values)
}

//  5 - Define the steps and sub-forms and each field for step
export const forms: Form<CampaignFormType>[] = [
  {
    id: 1,
    title: 'Bem-vindo à DesignerHaus.',
    description: 'Antes de iniciar, conte um pouco sobre você',
    form: Step1,
    fields: ['name', 'role', 'knowledge', 'youFindUs'],
  },
  {
    id: 1,
    title: 'Para que você usará o DesignerHaus?',
    description: 'Isso nos ajuda a criar uma experiência melhor.',
    form: Step2,
    fields: ['youUse'],
  },
]

//  6 - Define initial Form Options
const initialFormOptions: UseMultiStepFormTypeOptions<CampaignFormType> = {
  schema: CampaignFormSchema,
  currentStep: 0,
  setCurrentStep: (value) => {},
  forms,
  saveFormData,
}

// 7 - Build the Context and Provider
export const { FormContext: OnboardingFormContext, FormProvider: OnboardingProvider } = buildMultiStepForm(
  initialFormOptions,
  CampaignFormSchema,
  initialFormData,
)
