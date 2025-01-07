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
import FormField from '../components/FormField'
import { zodResolver } from '@hookform/resolvers/zod'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { forgetPassword } from '@/store/slices/forgetPasswordSlice'
import Spinner from '@/components/custom/Spinner'
import { useNavigate } from 'react-router-dom'
import { Footer, NavBar } from '@/features/landing-page/components.barel'

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
        navigate('/otp-verification')
      } catch (err) {
        console.error('Failed to send OTP:', err)
      }
    }
  }

  return (
    <>
      <NavBar showLinks={false} />
      <main className='flex h-screen items-center justify-center'>
        <Card className='grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl mx-4 rounded-lg shadow-lg overflow-hidden'>
          {/* Banner Section */}
          <article className='hidden lg:block relative'>
            <img
              src='/banner.png'
              alt='Reset Password Visual'
              className='w-full h-full object-cover'
            />
            <footer className='absolute inset-0 bg-black bg-opacity-40 flex items-end p-6 text-white'>
              <p className='text-sm'>
                © {new Date().getFullYear()} Triple Platform. All rights
                reserved. Crafted with 🖤
              </p>
            </footer>
          </article>

          {/* Form Section */}
          <article className='p-8 flex items-center justify-center'>
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
                    <Button
                      type='submit'
                      className='bg-theme-primary hover:bg-theme-primary/90 text-white font-medium py-2 rounded-md transition-colors duration-200'
                    >
                      Send OTP
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className='text-center py-6'>
                  <p className='text-sm text-zinc-600 dark:text-zinc-400'>
                    Remember your password?{' '}
                    <a
                      href='/login'
                      className='font-medium text-theme-secondary hover:underline transition-colors duration-200'
                    >
                      Login
                    </a>
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
      <Footer />
    </>
  )
}
