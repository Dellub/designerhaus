import { Button } from '@workspace/ui/components/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@workspace/ui/components/command'
import { Input } from '@workspace/ui/components/input'
import { Popover, PopoverContent, PopoverTrigger } from '@workspace/ui/components/popover'
import { ScrollArea } from '@workspace/ui/components/scroll-area'
import { cn } from '@workspace/ui/lib/utils'
import { CheckIcon, ChevronsUpDown } from 'lucide-react'
import { forwardRef, useEffect, useState } from 'react'
import * as RPNInput from 'react-phone-number-input'
import flags from 'react-phone-number-input/flags'

type InputPhoneProps = Omit<React.ComponentProps<'input'>, 'onChange' | 'value' | 'ref'> &
  Omit<RPNInput.Props<typeof RPNInput.default>, 'onChange'> & {
    onChange?: (value: RPNInput.Value) => void
  }

export const InputPhone: React.ForwardRefExoticComponent<InputPhoneProps> = forwardRef<
  React.ElementRef<typeof RPNInput.default>,
  InputPhoneProps
>(({ className, onChange, ...props }, ref) => {
  const [defaultCountry, setDefaultCountry] = useState<RPNInput.Country>('BR')

  useEffect(() => {
    if (navigator.geolocation) {
      fetch('https://ipapi.co/json/')
        .then((response) => response.json())
        .then((data) => {
          // O código do país vem em formato ISO (ex: 'BR', 'US')
          setDefaultCountry(data.country as RPNInput.Country)
        })
        .catch(() => {
          // Fallback para 'US' em caso de erro
          setDefaultCountry('BR')
        })
    }
  }, [])

  return (
    <RPNInput.default
      ref={ref}
      className={cn(
        'has-focus-visible:ring-[#92cbfe] has-focus-visible:ring-[1.50px] flex rounded-2xl shadow-[0px_0px_0px_1.5px_rgba(60,68,77,0.04),_0px_0.75px_0.75px_0px_rgba(60,68,77,0.04),_0px_2px_3px_0px_rgba(60,68,77,0.04),_0px_4px_8px_-1px_rgba(60,68,77,0.04)] transition-[color,box-shadow]',
        className,
      )}
      defaultCountry={defaultCountry}
      flagComponent={FlagComponent}
      countrySelectComponent={CountrySelect}
      inputComponent={InputComponent}
      smartCaret={false}
      /**
       * Handles the onChange event.
       *
       * react-phone-number-input might trigger the onChange event as undefined
       * when a valid phone number is not entered. To prevent this,
       * the value is coerced to an empty string.
       *
       * @param {E164Number | undefined} value - The entered value
       */
      onChange={(value) => onChange?.(value || ('' as RPNInput.Value))}
      {...props}
    />
  )
})
InputPhone.displayName = 'InputPhone'

const InputComponent = forwardRef<HTMLInputElement, React.ComponentProps<'input'>>(({ className, ...props }, ref) => (
  <Input className={cn('shadow-none rounded-s-none pl-0 focus-visible:ring-0', className)} {...props} ref={ref} />
))
InputComponent.displayName = 'InputComponent'

type CountryEntry = { label: string; value: RPNInput.Country | undefined }

type CountrySelectProps = {
  disabled?: boolean
  value: RPNInput.Country
  options: CountryEntry[]
  onChange: (country: RPNInput.Country) => void
}

const CountrySelect = ({ disabled, value: selectedCountry, options: countryList, onChange }: CountrySelectProps) => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button
          type="button"
          variant="outline"
          className="group-flag-button flex gap-1 px-3 focus:z-10 rounded-e-none !border-none !ring-0 shadow-none hover:bg-white"
          disabled={disabled}
        >
          <FlagComponent country={selectedCountry} countryName={selectedCountry} />
          <ChevronsUpDown className="min-w-4 opacity-100 group-disabled/flag-button:opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[300px] p-0">
        <Command>
          <CommandInput placeholder="Search country..." />
          <CommandList>
            <ScrollArea className="max-h-72">
              <CommandEmpty>No country found.</CommandEmpty>
              <CommandGroup>
                {countryList.map(({ value, label }) =>
                  value ? (
                    <CountrySelectOption
                      key={value}
                      country={value}
                      countryName={label}
                      selectedCountry={selectedCountry}
                      onChange={onChange}
                    />
                  ) : null,
                )}
              </CommandGroup>
            </ScrollArea>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

interface CountrySelectOptionProps extends RPNInput.FlagProps {
  selectedCountry: RPNInput.Country
  onChange: (country: RPNInput.Country) => void
}

const CountrySelectOption = ({ country, countryName, selectedCountry, onChange }: CountrySelectOptionProps) => {
  return (
    <CommandItem className="gap-2" onSelect={() => onChange(country)}>
      <FlagComponent country={country} countryName={countryName} />
      <span className="flex-1 text-sm">{countryName}</span>
      <span className="text-sm text-foreground/50">{`+${RPNInput.getCountryCallingCode(country)}`}</span>
      <CheckIcon className={`ml-auto size-4 ${country === selectedCountry ? 'opacity-100' : 'opacity-0'}`} />
    </CommandItem>
  )
}

const FlagComponent = ({ country, countryName }: RPNInput.FlagProps) => {
  const Flag = flags[country]

  return (
    <span className="flex h-4 w-6 overflow-hidden rounded-xs bg-foreground/20 [&_svg]:!size-full">
      {Flag && <Flag title={countryName} />}
    </span>
  )
}
