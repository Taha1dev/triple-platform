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

export type FormFieldProps = {
  label: string
  name: string
  id?: string
  type?: string
  schema?: ZodType<any>
  className?: string
  disabled?: boolean
  textareaRows?: number
  defaultValue?: string
  placeholder?: string
} & (
  | InputHTMLAttributes<HTMLInputElement>
  | TextareaHTMLAttributes<HTMLTextAreaElement>
)

const FormField: React.FC<FormFieldProps> = ({
  label,
  name,
  id,
  placeholder = '',
  type = 'text',
  disabled = false,
  className,
  textareaRows = 5,
  defaultValue,
  ...props
}) => {
  const {
    register,
    formState: { errors },
    control,
  } = useFormContext()

  const [showPassword, setShowPassword] = useState(false)
  const error = errors[name]?.message as string | undefined
  const inputId = id || name

  const togglePasswordVisibility = () => setShowPassword(prev => !prev)

  // Common input props
  const commonRegisterProps = {
    id: inputId,
    disabled,
    placeholder,
    defaultValue,
    className: cn(
      'w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background',
      'placeholder:text-muted-foreground focus:outline-none focus:ring-2',
      'focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
      error && 'border-red-500',
      className,
    ),
    'aria-describedby': error ? `${inputId}-error` : undefined,
    ...props,
  }

  return (
    <div className={cn('mb-4 flex flex-col items-start w-full')}>
      <Label htmlFor={inputId} className='font-medium mb-1 ml-1'>
        {label}
      </Label>

      {type === 'date' ? (
        <DatePicker
          id={id}
          control={control}
          name={name}
          defaultValue={defaultValue as string | undefined}
        />
      ) : type === 'textarea' ? (
        <textarea
          rows={textareaRows}
          {...register(name)}
          {...(commonRegisterProps as TextareaHTMLAttributes<HTMLTextAreaElement>)}
        />
      ) : (
        <div className='relative w-full'>
          <Input
            type={type === 'password' && showPassword ? 'text' : type}
            autoComplete={type === 'password' ? 'off' : 'on'}
            {...register(name)}
            {...(commonRegisterProps as InputHTMLAttributes<HTMLInputElement>)}
          />
          {type === 'password' && (
            <Button
              type='button'
              variant='ghost'
              size='sm'
              className='absolute right-2 top-1/2 transform -translate-y-1/2'
              onClick={togglePasswordVisibility}
              aria-label={showPassword ? 'Hide password' : 'Show password'}
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

      {error && (
        <span
          id={`${inputId}-error`}
          className='text-red-600 text-sm mt-1 ml-2'
        >
          {error}
        </span>
      )}
    </div>
  )
}

export default FormField
