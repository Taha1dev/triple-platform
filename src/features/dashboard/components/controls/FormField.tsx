/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { useState } from 'react'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { useFormContext } from 'react-hook-form'
import { ZodType } from 'zod'
import { DatePicker } from './DatePicker'
import { Eye, EyeOff } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { cn } from '@/lib/utils'
import type { InputHTMLAttributes, TextareaHTMLAttributes } from 'react'

type InputProps = InputHTMLAttributes<HTMLInputElement>
type TextareaProps = TextareaHTMLAttributes<HTMLTextAreaElement>
export type FormFieldProps = {
  label: string
  id: string
  value?: string
  placeholder?: string
  type?: string
  schema?: ZodType<any>
  className?: string
  textareaRows?: number
} & InputProps

const FormField: React.FC<FormFieldProps> = ({
  label,
  id,
  placeholder = '',
  type = 'text',
  value = '',
  className,
  textareaRows = 5,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext()

  const [showPassword, setShowPassword] = useState(false)
  const error = errors[id]?.message as string | undefined

  const togglePasswordVisibility = () => setShowPassword(prev => !prev)

  return (
    <div className={cn('mb-4 flex flex-col items-start w-full', className)}>
      <Label htmlFor={id} className='font-medium mb-1 ml-1'>
        {label}
      </Label>

      {type === 'date' ? (
        <DatePicker id={id} control={control} name={id} />
      ) : type === 'textarea' ? (
        <textarea
          value={value}
          id={id}
          rows={textareaRows}
          placeholder={placeholder}
          {...register(id)}
          className={cn(
            'w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
            error && 'border-red-500',
          )}
        />
      ) : (
        <div className='relative w-full'>
          <Input
            {...props}
            value={value}
            autoComplete='true'
            id={id}
            type={type === 'password' && showPassword ? 'text' : type}
            placeholder={placeholder}
            {...register(id)}
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
      )}

      {error && <span className='text-red-600 text-sm mt-1 ml-2'>{error}</span>}
    </div>
  )
}

export default FormField
