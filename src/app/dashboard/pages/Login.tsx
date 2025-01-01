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
import { Link } from 'react-router-dom'
interface FormValues {
  username: string
  password: string
}
export default function Login() {
  const form = useForm<FormValues>()
  const { register, handleSubmit, formState } = form
  const FormFields: FormFieldProps[] = [
    {
      id: '1',
      label: 'Email',
      placeholder: 'Enter your Email',
      register: register,
      type: 'email',
      formState: formState,
      required: true,
    },
    {
      id: '2',
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
    <main className='bg-zinc-950 flex h-screen items-center justify-center'>
      <section className='grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl mx-4 bg-white rounded-lg shadow-lg overflow-hidden'>
        {/* Image Section */}
        <article className='hidden lg:block relative'>
          <img
            src='/banner.png'
            alt='Login Visual'
            className='w-full h-full object-cover'
          />
          <footer className='absolute inset-0 bg-black bg-opacity-40 flex items-end p-6'>
            <p className='text-white text-sm'>
              © {new Date().getFullYear()} Triple Platform. All rights reserved.
              Crafted with 🖤
            </p>
          </footer>
        </article>

        {/* Form Section */}
        <article className='p-8'>
          <Card className='bg-transparent shadow-none'>
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
                {FormFields.map(e => (
                  <div key={e.id} className='w-full'>
                    <FormField {...e} />
                  </div>
                ))}
                <Link
                  to='/reset-password'
                  className='inline-block text-sm text-theme-variant hover:underline transition-colors duration-200'
                >
                  Forgot password?
                </Link>
                <Button
                  type='submit'
                  className='w-full bg-theme-primary text-white font-medium py-2 rounded-md transition-colors duration-200 mt-6'
                >
                  LOGIN
                </Button>
              </form>
            </CardContent>
            <CardFooter className='flex flex-col items-center space-y-4 py-6'>
              <div className='w-full border-t border-zinc-200 my-4'></div>
              <p className='text-sm text-zinc-600'>
                Don't have an account?{' '}
                <Link
                  to='/register'
                  className='font-medium text-theme-variant hover:underline transition-colors duration-200'
                >
                  SIGN UP
                </Link>
              </p>
            </CardFooter>
          </Card>
        </article>
      </section>
    </main>
  )
}
