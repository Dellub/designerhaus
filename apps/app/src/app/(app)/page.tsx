'use client'

import { useLogoutUserMutation } from '@/services/user/use-user-mutation'
import { useUserMeQuery } from '@/services/user/use-user-query'
import { Button } from '@workspace/ui/components/button'
import { redirect } from 'next/navigation'

export default function Page() {
  const { data } = useUserMeQuery()
  const { mutateAsync: logoutUser } = useLogoutUserMutation()

  console.log(data)

  return (
    <div className="flex items-center justify-center min-h-svh">
      <div className="flex flex-col items-center justify-center gap-4">
        <h1 className="text-2xl font-bold">{data?.firstName}</h1>
        <Button
          className="duration-300"
          onClick={async () => {
            await logoutUser()
            redirect('/auth/login')
          }}
        >
          Hello Button!
        </Button>
      </div>
    </div>
  )
}
