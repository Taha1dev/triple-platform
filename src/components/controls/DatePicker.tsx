import { useEffect, useState } from 'react'
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
import moment from 'moment'

type DatePickerProps = UseControllerProps & {
  id?: string
}

export function DatePicker({ id, control, name }: DatePickerProps) {
  const [day, setDay] = useState<string>('')
  const [month, setMonth] = useState<string>('')
  const [year, setYear] = useState<string>('')
  const maxYear = moment().year() - 2

  const { field } = useController({
    control,
    name,
    defaultValue: '',
  })

  useEffect(() => {
    if (field.value) {
      const date = moment(field.value, ['DD/MM/YYYY', moment.ISO_8601])
      if (date.isValid()) {
        setDay(date.format('DD'))
        setMonth(date.format('MM'))
        setYear(date.format('YYYY'))
      }
    }
  }, [field.value])

  const handleDayChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (Number(value) < 0 || value.length > 2) return

    setDay(value)
    updateCombinedDate(value, month, year)
  }

  const handleMonthChange = (value: string) => {
    setMonth(value)
    updateCombinedDate(day, value, year)
  }

  const handleYearChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value
    if (Number(value) < 0 || value.length > 4 || Number(value) > maxYear) return

    setYear(value)
    updateCombinedDate(day, month, value)
  }

  const updateCombinedDate = (day: string, month: string, year: string) => {
    if (day && month && year) {
      const formattedDate = moment(`${day}/${month}/${year}`, 'DD/MM/YYYY')
      if (formattedDate.isValid()) {
        field.onChange(formattedDate.format('DD/MM/YYYY'))
      } else {
        field.onChange('')
      }
    } else {
      field.onChange('')
    }
  }

  return (
    <div className='w-full flex gap-3'>
      {/* Day Input */}
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
        <Select onValueChange={handleMonthChange} value={month}>
          <SelectTrigger className='w-full'>
            <SelectValue placeholder='MM'>
              {month ? moment(month, 'MM').format('MMMM') : 'MM'}
            </SelectValue>
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectLabel>Months</SelectLabel>
              {Array.from({ length: 12 }, (_, i) => i + 1).map(monthValue => {
                const monthStr = String(monthValue).padStart(2, '0')
                return (
                  <SelectItem key={monthValue} value={monthStr}>
                    {moment(monthStr, 'MM').format('MMMM')}
                  </SelectItem>
                )
              })}
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
