'use client'

import { useUserMeQuery } from '@/services/user/use-user-query'

export default function LayoutApp({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const { isFetching } = useUserMeQuery()

  console.log('isFetching', isFetching)

  if (isFetching) {
    return <div className="flex flex-col items-center justify-center h-screen w-screen">Loading...</div>
  }

  return <div className="bg-gradient-to-b from-[#f0f0f3] to-[#f7f7fb]">{children}</div>
}
