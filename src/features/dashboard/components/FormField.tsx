/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Input } from '@/components/ui/input'
import { useFormContext, Controller } from 'react-hook-form'
import { ZodType } from 'zod'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover'
import { Button } from '@/components/ui/button'
import { Calendar } from '@/components/ui/calendar'
import { CalendarIcon } from 'lucide-react'
import moment from 'moment'

export type FormFieldProps = {
  label: string
  id: string
  placeholder?: string
  type?: string
  schema?: ZodType<any>
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  placeholder = '',
  type = 'text',
}) => {
  const {
    control,
    formState: { errors },
  } = useFormContext()

  const handleDateChange = (field: any, date: Date | undefined) => {
    if (date) {
      const formattedDate = moment(date).format('MM/DD/YYYY')
      field.onChange(formattedDate)
    } else {
      field.onChange(null)
    }
  }

  return (
    <div className='mb-4 flex flex-col items-start'>
      <label htmlFor={id} className='font-medium mb-1 ml-1'>
        {label}
      </label>
      {type === 'date' ? (
        <Controller
          name={id}
          control={control}
          render={({ field }) => (
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant='outline'
                  className={`w-full justify-start text-left font-normal ${
                    !field.value ? 'text-muted-foreground' : ''
                  }`}
                >
                  <CalendarIcon className='mr-2 h-4 w-4' />
                  {field.value ? (
                    moment(field.value, 'MM/DD/YYYY').format('MM/DD/YYYY')
                  ) : (
                    <span>Pick a date</span>
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className='w-auto p-0'>
                <Calendar
                  mode='single'
                  selected={
                    field.value
                      ? moment(field.value, 'MM/DD/YYYY').toDate()
                      : undefined
                  }
                  onSelect={date => handleDateChange(field, date)}
                  initialFocus
                />
              </PopoverContent>
            </Popover>
          )}
        />
      ) : (
        <Input
          autoComplete='true'
          id={id}
          type={type}
          placeholder={placeholder}
          {...control.register(id)}
        />
      )}
      {errors[id] && (
        <span className='text-red-600 text-sm mt-1 ml-2'>
          {errors[id]?.message as string}
        </span>
      )}
    </div>
  )
}

export default FormField
