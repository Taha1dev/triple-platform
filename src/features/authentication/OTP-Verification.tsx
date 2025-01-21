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
import { useEffect, useState } from 'react'
import { RefreshCcw } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { resendOtp } from '@/store/slices/resendOTPSlice'
import Spinner from '@/components/custom/Spinner'
import { verifyOtp } from '@/store/slices/verifyOTPSlice'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'sonner'
import BannerAuthImage from '@/components/custom/auth-image/BannerAuthImage'
import DotPattern from '@/components/ui/dot-pattern'
import { cn } from '@/lib/utils'

export default function OTP_Verification() {
  const navigate = useNavigate()
  const [otp, setOtp] = useState('')
  const [otpError, setOtpError] = useState<string | null>(null)
  const [localOtpContent, setLocalOtpContent] = useState({
    title: 'Reset Your Password',
    sub: 'Enter the OTP sent to your email and set a new password',
  })
  const otpContent = useSelector((state: RootState) => state.otpContent)
  useEffect(() => {
    setLocalOtpContent({
      title: otpContent.title || 'Reset Your Password', // Fallback to default
      sub:
        otpContent.sub ||
        'Enter the OTP sent to your email and set a new password',
    })
  }, [otpContent])
  const methods = useForm<any>()
  const { handleSubmit, control } = methods

  const dispatch = useDispatch<AppDispatch>()
  const { loading, email } = useSelector(
    (state: RootState) => state.forgetPassword,
  )
  const { path } = useSelector((state: RootState) => state.routerInstance)
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
      navigate(path)
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
      {' '}
      <DotPattern
        className={cn(
          '[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]',
          'inset-x-0 inset-y-[-50%] h-[150%]',
        )}
      />
      <main className='flex h-screen items-center justify-center bg-background'>
        <Card className='grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl mx-4 rounded-lg shadow-lg overflow-hidden z-20 bg-background '>
          <BannerAuthImage />

          {/* Form Section */}
          <article className='p-8'>
            <FormProvider {...methods}>
              <Card className='bg-transparent shadow-none'>
                <CardHeader className='space-y-2'>
                  <CardTitle className='text-center text-2xl font-bold'>
                    {localOtpContent.title}
                  </CardTitle>
                  <CardDescription className='text-center text-sm text-zinc-600 dark:text-theme-secondary/80'>
                    {localOtpContent.sub}
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
                    <Link
                      to='/login'
                      className='font-medium text-foreground hover:underline'
                    >
                      Login
                    </Link>
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
      {(loading || v_loading) ?? (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <Spinner />
        </div>
      )}
    </>
  )
}
