/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
import FormField, { FormFieldProps } from '../components/FormField'
interface FormValues {
  username: string
  password: string
}
export default function Register() {
  const form = useForm<FormValues>()
  const { register, handleSubmit, formState } = form
  const FormFields: FormFieldProps[] = [
    {
      id: '1',
      label: 'First Name',
      placeholder: 'Enter your First Name',
      register: register,
      type: 'text',
      formState: formState,
      required: true,
    },
    {
      id: '2',
      label: 'Last Name',
      placeholder: 'Enter your Last Name',
      register: register,
      type: 'text',
      formState: formState,
      required: true,
    },
    {
      id: '3',
      label: 'Email',
      placeholder: 'Enter your Email Address',
      register: register,
      type: 'email',
      formState: formState,
      required: true,
    },
    {
      id: '5',
      label: 'Phone Number',
      placeholder: 'Enter your Phone Number',
      register: register,
      type: 'number',
      formState: formState,
      required: true,
    },
    {
      id: '4',
      label: 'Password',
      placeholder: 'Enter your Password',
      register: register,
      type: 'password',
      formState: formState,
      required: true,
    },
  ]
  const onSubmit = (data: FormValues) => {
    console.log('Form data submitted:', data)
  }
  return (
    <div className=' bg-zinc-950 flex h-screen items-center justify-center bg-hero-pattern bg-no-repeat bg-cover'>
      <Card className='w-full max-w-3xl mx-2 bg-white rounded-lg lg:mx-auto min-h-96 backdrop-blur-sm shadow-lg'>
        <CardHeader className='space-y-2'>
          <CardTitle className='text-center text-2xl font-bold text-zinc-950'>
            Welcome Back
          </CardTitle>
          <p className='text-center text-sm text-zinc-600'>
            Please log in to your account
          </p>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-6 lg:gap-2 w-full'>
              {FormFields.map(e => (
                <div key={e.id}>
                  <FormField {...e} />
                </div>
              ))}
            </div>
            <a
              href='#'
              className='inline-block text-sm text-theme-variant hover:underline transition-colors duration-200'
            >
              Forgot password?
            </a>
            <Button
              type='submit'
              className='w-full bg-theme-primary text-white font-medium py-2 rounded-md  transition-colors duration-200'
            >
              LOGIN
            </Button>
          </form>
        </CardContent>
        <CardFooter className='flex flex-col items-center space-y-4 py-6'>
          <div className='w-full border-t border-zinc-200 my-4'></div>{' '}
          {/* Divider */}
          <div className='text-sm text-zinc-600'>
            Don't have an account?{' '}
            <a
              href='#'
              className='font-medium text-theme-variant hover:underline transition-colors duration-200'
            >
              SIGN UP
            </a>
          </div>
        </CardFooter>
      </Card>
    </div>
  )
}
