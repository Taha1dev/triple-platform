/* eslint-disable @typescript-eslint/no-explicit-any */
import { Input } from '@/components/ui/input'
import { UseFormRegister } from 'react-hook-form'
export type FormFieldProps = {
  label: string
  type: string
  id: string
  placeholder: string
  register: UseFormRegister<any>
  required?: boolean
  formState?: {
    errors: Record<string, any>
  }
}

const FormField: React.FC<FormFieldProps> = ({
  label,
  type,
  id,
  register,
  required,
  formState,
  placeholder,
}) => {
  return (
    <div className='mb-4 flex flex-col items-start'>
      <label
        htmlFor={id}
        className='font-medium text-theme-primary/90 mb-1 ml-1'
      >
        {label}
      </label>
      <Input
        id={id}
        type={type}
        placeholder={placeholder}
        {...register(id, { required })}
      />
      {required && formState?.errors[id] && (
        <span className='text-red-600 text-sm mt-1 ml-2'>
          {formState.errors[id]?.type === 'required' &&
            'This field is required'}
        </span>
      )}
    </div>
  )
}

export default FormField
