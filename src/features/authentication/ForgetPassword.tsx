/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import { FormProvider, useForm } from 'react-hook-form'
import { z } from 'zod'
import { emailSchema } from '@/models/zod-schema/zod.schema'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { forgetPassword } from '@/store/slices/forgetPasswordSlice'
import Spinner from '@/components/custom/Spinner'
import { Link, useNavigate } from 'react-router-dom'
import { setPath } from '@/store/slices/routerSlice'
import BannerAuthImage from '@/components/custom/auth-image/BannerAuthImage'
import { setTitle, setSub } from '@/store/slices/otpContentSlice'
import FormField from '../dashboard/components/controls/FormField'
import DotPattern from '@/components/ui/dot-pattern'
import { cn } from '@/lib/utils'
import { setEmail } from '@/store/slices/emailSlice'

type FormValues = z.infer<typeof emailSchema>

export default function ForgetPassword() {
  const navigate = useNavigate()
  const methods = useForm<FormValues>({
    resolver: zodResolver(emailSchema),
  })
  const { handleSubmit } = methods

  const dispatch = useDispatch<AppDispatch>()
  const { loading } = useSelector((state: RootState) => state.forgetPassword)
  const onSubmit = async (data: FormValues) => {
    if (data) {
      try {
        await dispatch(forgetPassword(data.email)).unwrap()
        dispatch(setPath('/reset-password'))
        dispatch(setTitle('Reset Your Password'))
        dispatch(
          setSub('Enter the OTP sent to your email to reset your password.'),
        )
        dispatch(setEmail(data.email))
        navigate('/otp-verification')
      } catch (err) {
        console.error('Failed to send OTP:', err)
      }
    }
  }

  return (
    <>
      {' '}
      <DotPattern
        className={cn(
          '[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]',
          'inset-x-0 inset-y-[-50%] h-[150%]',
        )}
      />
      <main className='flex h-screen items-center justify-center'>
        <Card className='grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl mx-4 rounded-lg shadow-lg overflow-hidden z-20 bg-background border border-border'>
          {/* Banner Section */}
          <BannerAuthImage />

          {/* Form Section */}
          <article className='lg:p-10 bg-background'>
            {' '}
            <FormProvider {...methods}>
              <Card className='w-full bg-transparent shadow-none'>
                <CardHeader className='space-y-2 text-center'>
                  <CardTitle className='text-2xl font-bold'>
                    Reset Your Password
                  </CardTitle>
                  <CardDescription className='text-sm text-zinc-600 dark:text-zinc-400'>
                    Enter the OTP sent to your email and set a new password.
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='space-y-4 flex flex-col'
                  >
                    <FormField
                      id='email'
                      label='Email'
                      placeholder='Enter Your Email Here'
                      type='email'
                    />
                    <Button disabled={loading} type='submit'>
                      Send OTP
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className='text-center py-6'>
                  <p className='text-sm text-zinc-600 dark:text-zinc-400'>
                    Remember your password?{' '}
                    <Link
                      to='/login'
                      className='font-medium text-theme-secondary hover:underline transition-colors duration-200'
                    >
                      Login
                    </Link>
                  </p>
                </CardFooter>
              </Card>
            </FormProvider>
          </article>
        </Card>{' '}
        {loading && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <Spinner />
          </div>
        )}
      </main>
    </>
  )
}
