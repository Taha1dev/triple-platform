import { Check, ChevronsUpDown } from 'lucide-react'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { cn } from '@/lib/utils'
import { ScrollArea } from '@/components/ui/scroll-area'
import { useState } from 'react'
type Option = string | { id: string; name: string }

type MultiSelectProps = {
  options: Option[]
  selected: string[] // Always `string[]` of ids or values
  onChange: (selected: string[]) => void
  placeholder: string
  disabled?: boolean
  className?: string
}

export function MultiSelect({
  options,
  selected,
  onChange,
  placeholder,
  disabled = false,
  className,
}: MultiSelectProps) {
  const [open, setOpen] = useState(false)

  const getOptionValue = (option: Option) =>
    typeof option === 'string' ? option : option.id

  const getOptionLabel = (option: Option) =>
    typeof option === 'string' ? option : option.name

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant='outline'
          role='combobox'
          aria-expanded={open}
          disabled={disabled}
          className={`min-w-[200px] justify-between h-auto min-h-10 ${className}`}
        >
          {selected.length > 0 ? (
            <div className='flex flex-wrap gap-1'>
              {selected.length > 2 ? (
                <Badge variant='secondary' className='rounded-sm'>
                  {selected.length} selected
                </Badge>
              ) : (
                options
                  .filter(option => selected.includes(getOptionValue(option)))
                  .map(option => (
                    <Badge
                      key={getOptionValue(option)}
                      variant='secondary'
                      className='rounded-sm'
                    >
                      {getOptionLabel(option)}
                    </Badge>
                  ))
              )}
            </div>
          ) : (
            <span className='text-muted-foreground'>{placeholder}</span>
          )}
          <ChevronsUpDown className='ml-2 h-4 w-4 shrink-0 opacity-50' />
        </Button>
      </PopoverTrigger>
      <PopoverContent className='w-[200px] p-0'>
        <Command>
          <CommandInput
            placeholder={`Search ${placeholder.toLowerCase()}...`}
          />
          <CommandList>
            <CommandEmpty>No {placeholder.toLowerCase()} found.</CommandEmpty>
            <CommandGroup>
              <ScrollArea className='h-[200px]'>
                {options.map(option => {
                  const value = getOptionValue(option)
                  const label = getOptionLabel(option)
                  const isSelected = selected.includes(value)
                  return (
                    <CommandItem
                      key={value}
                      value={value}
                      onSelect={() => {
                        onChange(
                          isSelected
                            ? selected.filter(item => item !== value)
                            : [...selected, value],
                        )
                      }}
                    >
                      <Check
                        className={cn(
                          'mr-2 h-4 w-4',
                          isSelected ? 'opacity-100' : 'opacity-0',
                        )}
                      />
                      {label}
                    </CommandItem>
                  )
                })}
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
