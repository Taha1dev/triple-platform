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
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Footer } from '@/features/landing-page/components.barel'

// Define the Zod schema for form validation
const ResetPasswordSchema = z.object({
  newPassword: z.string().min(8, 'Password must be at least 8 characters'),
  confirmPassword: z
    .string()
    .min(8, 'Confirm Password must be at least 8 characters'),
})

type FormValues = z.infer<typeof ResetPasswordSchema>

export default function ResetPassword() {
  const [otp, setOtp] = useState('')
  const [otpError, setOtpError] = useState<string | null>(null)

  const methods = useForm<FormValues>({
    resolver: zodResolver(ResetPasswordSchema),
  })

  const { handleSubmit, reset } = methods

  const FormFields: FormFieldProps[] = [
    {
      label: 'New Password',
      id: 'newPassword',
      placeholder: 'Enter your new Password',
      type: 'password',
      schema: ResetPasswordSchema.shape.newPassword,
    },
    {
      label: 'Confirm Password',
      id: 'confirmPassword',
      placeholder: 'Confirm your Password',
      type: 'password',
      schema: ResetPasswordSchema.shape.confirmPassword,
    },
  ]

  const onSubmit = (data: FormValues) => {
    if (otp.length < 6) {
      setOtpError('OTP must be 6 digits!')
      return
    }

    if (data.newPassword !== data.confirmPassword) {
      setOtpError('Passwords do not match!')
      return
    }

    setOtpError(null) // Clear any previous errors
    console.log('Form data submitted:', data)
    console.log('OTP:', otp)
    alert('Password reset successfully!')
    reset()
    setOtp('')
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
            <footer className='absolute inset-0 bg-opacity-40 flex items-end p-6'>
              <p className='text-sm'>
                © {new Date().getFullYear()} Triple Platform. All rights
                reserved. Crafted with 🖤
              </p>
            </footer>
          </article>

          {/* Form Section */}
          <article className='p-8'>
            <FormProvider {...methods}>
              <Card className='bg-transparent shadow-none'>
                <CardHeader className='space-y-2'>
                  <CardTitle className='text-center text-2xl font-bold'>
                    Reset Your Password
                  </CardTitle>
                  <CardDescription className='text-center text-sm text-zinc-600 dark:text-theme-secondary/80'>
                    Enter the OTP sent to your email and set a new password
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                    {/* OTP Input */}
                    <div className='flex justify-center flex-col items-center'>
                      <InputOTP
                        maxLength={6}
                        value={otp}
                        onChange={(value: string) => setOtp(value)}
                      >
                        <InputOTPGroup>
                          {Array.from({ length: 6 }).map((_, index) => (
                            <InputOTPSlot key={index} index={index} />
                          ))}
                        </InputOTPGroup>
                      </InputOTP>
                      {otpError && (
                        <p className='text-red-600 text-sm mt-2'>{otpError}</p>
                      )}
                    </div>

                    {/* Form Fields */}
                    {FormFields.map(field => (
                      <div key={field.id} className='w-full'>
                        <FormField
                          label={field.label}
                          id={field.id}
                          placeholder={field.placeholder}
                          type={field.type}
                          schema={field.schema}
                        />
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
            </FormProvider>
          </article>
        </Card>
      </main>
      <Footer />
    </>
  )
}
