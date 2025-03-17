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

  const methods = useForm<any>()
  const { handleSubmit, control } = methods
  const otpContent = useSelector((state: RootState) => state.otpContent)
  const dispatch = useDispatch<AppDispatch>()
  const { email } = useSelector((state: RootState) => state.email)
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
      if (otpContent.title == 'Verify Your Email') {
        await dispatch(verifyOtp({ email, forgot_password_OTP: otp })).unwrap()
      }
      else
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

  useEffect(() => {
    console.log(otpContent)
    setLocalOtpContent({
      title: otpContent.title || 'Reset Your Password',
      sub:
        otpContent.sub ||
        'Enter the OTP sent to your email and set a new password',
    })
  }, [otpContent])

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
        <article className='grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl mx-4 rounded-lg shadow-lg overflow-hidden z-20 bg-background border border-border'>
          <BannerAuthImage />

          <article className='lg:p-10 bg-background '>
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
                    <Controller
                      name='otp'
                      control={control}
                      defaultValue=''
                      render={({ field }) => (
                        <InputOTP
                          maxLength={6}
                          value={field.value}
                          onChange={(value: string) => {
                            field.onChange(value)
                            setOtp(value)
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
                        Submit
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
        </article>
        {v_loading && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <Spinner />
          </div>
        )}
      </main>
      {v_loading ?? (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <Spinner />
        </div>
      )}
    </>
  )
}
