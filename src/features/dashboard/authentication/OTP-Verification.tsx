/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from '@/components/ui/input-otp'
import { Button } from '@/components/ui/button'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { useState } from 'react'
import { RefreshCcw } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { resendOtp } from '@/store/slices/resendOTPSlice'
import Spinner from '@/components/custom/Spinner'
import { verifyOtp } from '@/store/slices/verifyOTPSlice'
import { useNavigate } from 'react-router-dom'
import { Footer, NavBar } from '@/features/landing-page/components.barel'
import { toast } from 'sonner'

export default function OTP_Verification() {
  const navigate = useNavigate()
  const [otp, setOtp] = useState('')
  const [otpError, setOtpError] = useState<string | null>(null)

  const methods = useForm<any>()
  const { handleSubmit, control } = methods

  const dispatch = useDispatch<AppDispatch>()
  const { loading, email } = useSelector(
    (state: RootState) => state.forgetPassword,
  )
  const { loading: v_loading } = useSelector(
    (state: RootState) => state.verifyOtp,
  )

  const onSubmit = async () => {
    if (otp.length < 6) {
      setOtpError('error')
      console.log(otpError)
      return
    }
    if (!email) {
      toast.error('Email is missing ')
      return
    }

    try {
      await dispatch(verifyOtp({ email, forgot_password_OTP: otp })).unwrap()
      navigate('/reset-password')
    } catch (err) {
      console.error('Verification failed:', err)
    }
  }

  const resendVerificationCode = () => {
    if (!email) {
      toast.error('Email is missing')
      return
    }
    setOtp('')
    dispatch(resendOtp(email))
  }

  return (
    <>
      <NavBar showLinks={false} />
      <main className='flex h-screen items-center justify-center'>
        <Card className='grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl mx-4 rounded-lg shadow-lg overflow-hidden'>
          <article className='hidden lg:block relative'>
            <img
              src='/banner.png'
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
                  <form
                    onSubmit={handleSubmit(onSubmit)}
                    className='space-y-4 flex-col-center'
                  >
                    {/* OTP Input */}
                    <Controller
                      name='otp' // Name of the field
                      control={control}
                      defaultValue=''
                      render={({ field }) => (
                        <InputOTP
                          maxLength={6}
                          value={field.value}
                          onChange={(value: string) => {
                            field.onChange(value) // Update react-hook-form's state
                            setOtp(value) // Update local state
                          }}
                        >
                          <InputOTPGroup>
                            {Array.from({ length: 6 }).map((_, index) => (
                              <InputOTPSlot key={index} index={index} />
                            ))}
                          </InputOTPGroup>
                        </InputOTP>
                      )}
                    />
                    <div className='flex gap-2'>
                      <Button
                        disabled={otp.length < 6}
                        type='submit'
                        className='bg-foreground hover:bg-foreground/95 font-medium py-2 rounded-md transition-colors duration-200'
                      >
                        Reset Password
                      </Button>
                      <Button
                        type='button'
                        onClick={resendVerificationCode}
                        className='bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700'
                      >
                        <RefreshCcw />
                      </Button>
                    </div>
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
        {loading ||
          (v_loading && (
            <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
              <Spinner />
            </div>
          ))}
      </main>
      <Footer />
    </>
  )
}
