import { cn } from '@workspace/ui/lib/utils'

function Input({ className, type, ...props }: React.ComponentProps<'input'>) {
  return (
    <input
      type={type}
      data-slot="input"
      className={cn(
        'data-[placeholder]:text-[#80838d] file:text-foreground placeholder:text-[#80838d] selection:bg-primary selection:text-primary-foreground flex w-full min-w-0 rounded-2xl bg-white px-6 py-[18px] text-[#1c2024] text-sm font-normal font-inter leading-tight shadow-[0px_0px_0px_1.5px_rgba(60,68,77,0.04),_0px_0.75px_0.75px_0px_rgba(60,68,77,0.04),_0px_2px_3px_0px_rgba(60,68,77,0.04),_0px_4px_8px_-1px_rgba(60,68,77,0.04)] transition-[color,box-shadow] outline-none file:inline-flex file:h-7 file:border-0 file:bg-transparent file:text-sm file:font-medium disabled:pointer-events-none disabled:cursor-not-allowed disabled:opacity-50',
        'focus-visible:ring-[#92cbfe] focus-visible:ring-[1.50px]',
        'aria-invalid:ring-destructive/20 dark:aria-invalid:ring-destructive/40 aria-invalid:border-destructive',
        className,
      )}
      {...props}
    />
  )
}

export { Input }
