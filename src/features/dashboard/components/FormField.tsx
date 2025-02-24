/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { useFormContext } from 'react-hook-form'
import { ZodType } from 'zod'
import { DatePicker } from './DatePicker'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Label } from '@/components/ui/label' // Import the Label component from shadcn

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
  const [showPassword, setShowPassword] = useState(false)

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className='mb-4 flex flex-col items-start'>
      {type === 'date' ? (
        <DatePicker id={id} control={control} name={id} />
      ) : (
        <>
          <Label htmlFor={id} className='mb-1 ml-1'>
            {' '}
            {/* Use the Label component */}
            {label}
          </Label>
          <div className='relative w-full'>
            <Input
              autoComplete='true'
              id={id}
              type={type === 'password' && showPassword ? 'text' : type}
              placeholder={placeholder}
              {...control.register(id)}
            />
            {type === 'password' && (
              <Button
                type='button'
                variant='ghost'
                size='sm'
                className='absolute right-2 top-1/2 transform -translate-y-1/2'
                onClick={togglePasswordVisibility}
              >
                {showPassword ? (
                  <EyeOff className='h-4 w-4' />
                ) : (
                  <Eye className='h-4 w-4' />
                )}
              </Button>
            )}
          </div>
        </>
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
