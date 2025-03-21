import { cn } from '@workspace/ui/lib/utils'
import { Inter, Manrope } from 'next/font/google'

const manrope = Manrope({
  variable: '--font-manrope',
  subsets: ['latin'],
})

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
})

export function Body({ children, className }: { children: React.ReactNode; className?: string }) {
  return <body className={cn(`${manrope.variable} ${inter.variable} antialiased`, className)}>{children}</body>
}
