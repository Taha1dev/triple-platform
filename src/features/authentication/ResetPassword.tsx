/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'

import FormField, { FormFieldProps } from '../dashboard/components/FormField'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { ResetPasswordSchema } from '@/models/zod-schema/zod.schema'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { resetPassword } from '@/store/slices/resetPasswordSlice'
// import { useNavigate } from 'react-router-dom'
import Spinner from '@/components/custom/Spinner'
import BannerAuthImage from '@/components/custom/auth-image/BannerAuthImage'
import { Link } from 'react-router-dom'

type FormValues = z.infer<typeof ResetPasswordSchema>

export default function ResetPassword() {
  // const navigate = useNavigate()
  const methods = useForm<FormValues>({
    resolver: zodResolver(ResetPasswordSchema),
  })
  const dispatch = useDispatch<AppDispatch>()
  const { email } = useSelector((state: RootState) => state.forgetPassword)
  const { loading } = useSelector((state: RootState) => state.resetPassword)
  const { handleSubmit } = methods

  const FormFields: FormFieldProps[] = [
    {
      label: 'New Password',
      id: 'newPassword',
      placeholder: 'Enter your new Password',
      type: 'password',
    },
    {
      label: 'Confirm Password',
      id: 'confirmPassword',
      placeholder: 'Confirm your Password',
      type: 'password',
    },
  ]
  const onSubmit = async (data: FormValues) => {
    const { confirmPassword: password } = data
    try {
      await dispatch(resetPassword({ password, email })).unwrap()
      // navigate('/ss')
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
      <main className='flex h-screen items-center justify-center'>
        <Card className='grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl mx-4 rounded-lg shadow-lg overflow-hidden z-20 bg-background'>
          <BannerAuthImage />
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
                    <Link
                      to='/login'
                      className='font-medium text-theme-variant hover:underline transition-colors duration-200'
                    >
                      Login
                    </Link>
                  </p>
                </CardFooter>
              </Card>
            </FormProvider>
          </article>
        </Card>
        {loading && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <Spinner />
          </div>
        )}
      </main>
    </>
  )
}
