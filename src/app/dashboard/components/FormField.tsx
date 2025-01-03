/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import { Input } from '@/components/ui/input'
import { useFormContext } from 'react-hook-form'
import { ZodType } from 'zod'

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
    register,
    formState: { errors },
  } = useFormContext()

  return (
    <div className='mb-4 flex flex-col items-start'>
      <label htmlFor={id} className='font-medium mb-1 ml-1'>
        {label}
      </label>
      <Input id={id} type={type} placeholder={placeholder} {...register(id)} />
      {errors[id] && (
        <span className='text-red-600 text-sm mt-1 ml-2'>
          {errors[id]?.message as string}
        </span>
      )}
    </div>
  )
}

export default FormField
