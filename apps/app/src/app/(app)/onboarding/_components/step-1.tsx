import { FormControl, FormField, FormItem, FormMessage } from '@workspace/ui/components/form'
import { Input } from '@workspace/ui/components/input'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@workspace/ui/components/select'
import { useFormContext } from 'react-hook-form'

export function Step1() {
  const { control } = useFormContext()

  return (
    <>
      <FormField
        control={control}
        name="name"
        render={({ field }) => (
          <FormItem className="w-full flex flex-col gap-3">
            <FormControl>
              <Input placeholder="Digite seu nome" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="role"
        render={({ field }) => (
          <FormItem className="w-full flex flex-col gap-3">
            <FormControl>
              <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Qual é o seu papel?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="knowledge"
        render={({ field }) => (
          <FormItem className="w-full flex flex-col gap-3">
            <FormControl>
              <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Qual seu nível de conhecimento?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={control}
        name="youFindUs"
        render={({ field }) => (
          <FormItem className="w-full flex flex-col gap-3">
            <FormControl>
              <Select {...field} onValueChange={field.onChange} defaultValue={field.value}>
                <SelectTrigger>
                  <SelectValue placeholder="Como nos conheceu?" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">Light</SelectItem>
                </SelectContent>
              </Select>
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  )
}
