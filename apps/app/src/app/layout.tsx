import type { Metadata } from 'next'
import '@workspace/ui/globals.css'
import { Body } from '@/components/body'
import { Providers } from '@/components/providers'
import { Toaster } from '@workspace/ui/components/sonner'

export const metadata: Metadata = {
  title: 'DesignHaus',
  description: 'DesignHaus by Dellub',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="pt-BR">
      <Body>
        <Providers>
          {children}
          <Toaster />
        </Providers>
      </Body>
    </html>
  )
}
