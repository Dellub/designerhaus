'use client'

import { OnboardingProvider } from '@/context/onboarding-multi-step-form'
import { Mascot } from '@workspace/ui/components/mascot'
import { OnboardingForm } from './_components/form'
import { OnboardingHeader } from './_components/header'
import { OnboardingProgress } from './_components/progress'

export default function Page() {
  return (
    <main className="w-screen overflow-x-hidden min-h-screen flex flex-col justify-center items-center py-10 px-4">
      <Mascot />
      <div className="max-w-[426px] w-full p-8 flex flex-col items-center justify-center rounded-[18px] bg-[#fbfbfc]/95 shadow-[inset_0px_2px_0px_0px_currentColor] shadow-white">
        <div className="w-full flex flex-col gap-8">
          <OnboardingProvider>
            <div className="flex flex-col gap-6">
              <OnboardingProgress />
              <OnboardingHeader />
            </div>
            <OnboardingForm />
          </OnboardingProvider>
        </div>
      </div>
    </main>
  )
}
