/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react'
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import FormField, { FormFieldProps } from '../components/FormField'
import { useForm } from 'react-hook-form'
import { Footer } from '@/app/landing-page/components.barel'
interface FormValues {
  username: string
  password: string
}
export default function ResetPassword() {
  const [otp, setOtp] = useState('')
  const form = useForm<FormValues>()
  const { register, handleSubmit: hs, formState } = form
  const FormFields: FormFieldProps[] = [
    {
      id: '1',
      label: 'New Password',
      placeholder: 'Enter your new Password',
      register: register,
      type: 'password',
      formState: formState,
      required: true,
    },
    {
      id: '2',
      label: 'Confirm Password',
      placeholder: 'Confirm Password',
      register: register,
      type: 'password',
      formState: formState,
      required: true,
    },
  ]
  const onSubmit = (data: FormValues) => {
    console.log('Form data submitted:', data)

    if (otp.length < 6) {
      alert('OTP must be 6 digits!')
      return
    }

    console.log('OTP:', otp)
    alert('Password reset successfully!')
  }

  return (
    <>
      <main className='flex h-screen items-center justify-center'>
        <Card className='grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl mx-4 rounded-lg shadow-lg overflow-hidden'>
          {/* Image Section */}
          <article className='hidden lg:block relative'>
            <img
              src='/banner.png' // Replace with your image path
              alt='Reset Password Visual'
              className='w-full h-full object-cover'
            />
            <footer className='absolute inset-0  bg-opacity-40 flex items-end p-6'>
              <p className='text-sm'>
                © {new Date().getFullYear()} Triple Platform. All rights
                reserved. Crafted with 🖤
              </p>
            </footer>
          </article>

          {/* Form Section */}
          <article className='p-8'>
            <Card className='bg-transparent shadow-none'>
              <CardHeader className='space-y-2'>
                <CardTitle className='text-center text-2xl font-bold '>
                  Reset Your Password
                </CardTitle>
                <CardDescription className='text-center text-sm text-zinc-600 dark:text-theme-secondary/80'>
                  Enter the OTP sent to your email and set a new password
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={hs(onSubmit)} className='space-y-4'>
                  <div className='flex justify-center'>
                    <InputOTP
                      maxLength={6}
                      value={otp}
                      onChange={value => setOtp(value)}
                    >
                      <InputOTPGroup>
                        {Array.from({ length: 6 }).map((_, index) => (
                          <InputOTPSlot key={index} index={index} />
                        ))}
                      </InputOTPGroup>
                    </InputOTP>
                  </div>
                  {FormFields.map(e => (
                    <div key={e.id} className='w-full space-y-2'>
                      <FormField {...e} />
                    </div>
                  ))}

                  {/* Submit Button */}
                  <Button
                    type='submit'
                    className='w-full bg-foreground hover:bg-foreground/95 font-medium py-2 rounded-md transition-colors duration-200'
                  >
                    Reset Password
                  </Button>
                </form>
              </CardContent>
              <CardFooter className='flex flex-col items-center space-y-4 py-6'>
                <div className='w-full border-t border-zinc-200 my-4'></div>
                <p className='text-sm text-zinc-600 dark:text-theme-secondary/80'>
                  Remember your password?{' '}
                  <a
                    href='/login'
                    className='font-medium text-theme-variant hover:underline transition-colors duration-200'
                  >
                    Login
                  </a>
                </p>
              </CardFooter>
            </Card>
          </article>
        </Card>
      </main>
      <Footer />
    </>
  )
}
