import { FormControl, FormField, FormItem, FormMessage } from '@workspace/ui/components/form'
import { Input } from '@workspace/ui/components/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select'
import { useFormContext } from 'react-hook-form'

export function Step2() {
  const { control } = useFormContext()

  return (
    <>
      <FormField
        control={control}
        name="youUse"
        render={({ field }) => (
          <FormItem className="w-full flex flex-col gap-3">
            <FormControl>
              <Input placeholder="Digite seu nome" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
