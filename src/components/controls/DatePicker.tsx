import { useState } from 'react'
import { Input } from '@/components/ui/input'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { useController, UseControllerProps } from 'react-hook-form'
import { fullYear } from '@/features/landing-page/constants'

type DatePickerProps = UseControllerProps & {
  id?: string
}

export function DatePicker({ id, control, name }: DatePickerProps) {
  const [day, setDay] = useState<string>('')
  const [month, setMonth] = useState<string>('')
  const [year, setYear] = useState<string>('')

  const maxYear = fullYear - 2

  const { field } = useController({
    control,
    name,
    defaultValue: '',
  })

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (Number(value) < 0) {
      return
    }

    if (value.length > 2) {
      return
    }
    setDay(value)
    updateCombinedDate(value, month, year)
  }

  const handleMonthChange = (value: string) => {
    setMonth(value)
    updateCombinedDate(day, value, year)
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value

    if (Number(value) < 0) {
      return
    }

    if (value.length > 4) {
      return
    }
    if (Number(value) > maxYear) {
      return
    }
    setYear(value)
    updateCombinedDate(day, month, value)
    setYear(value)
    updateCombinedDate(day, month, value)
  }

  const updateCombinedDate = (day: string, month: string, year: string) => {
    if (day && month && year) {
      const formattedDay = day.padStart(2, '0')
      const formattedMonth = month.padStart(2, '0')
      const combinedDate = `${formattedDay}/${formattedMonth}/${year}`
      field.onChange(combinedDate)
    } else {
      field.onChange('')
    }
  }

  return (
    <div className='w-full flex gap-3'>
      <div className='flex-1'>
        <label
          htmlFor={`${id}-day`}
          className='block text-sm font-medium mb-1 text-foreground'
        >
          Day
        </label>
        <Input
          id={`${id}-day`}
          name='day'
          type='number'
          placeholder='DD'
          className='w-full'
          value={day}
          onChange={handleDayChange}
          min={1}
          max={31}
          maxLength={2}
        />
      </div>

      {/* Month Select */}
      <div className='flex-1'>
        <label
          htmlFor={`${id}-month`}
          className='block text-sm font-medium mb-1 text-foreground'
        >
          Month
        </label>
        <Select onValueChange={handleMonthChange}>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='MM' />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Months</SelectLabel>
              {Array.from({ length: 12 }, (_, i) => i + 1).map(monthValue => (
                <SelectItem
                  key={monthValue}
                  value={String(monthValue).padStart(2, '0')}
                >
                  {new Date(0, monthValue - 1).toLocaleString('default', {
                    month: 'long',
                  })}
                </SelectItem>
              ))}
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>

      {/* Year Input */}
      <div className='flex-1'>
        <label
          htmlFor={`${id}-year`}
          className='block text-sm font-medium mb-1 text-foreground'
        >
          Year
        </label>
        <Input
          id={`${id}-year`}
          name='year'
          type='number'
          placeholder='YYYY'
          className='w-full'
          value={year}
          min={1970}
          max={maxYear}
          onChange={handleYearChange}
        />
      </div>
    </div>
  )
}
