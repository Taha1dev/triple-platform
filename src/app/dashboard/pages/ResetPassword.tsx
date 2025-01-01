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

export default function ResetPassword() {
  const [otp, setOtp] = useState('')
  const [newPassword, setNewPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')

  const handleSubmit = (e: any) => {
    e.preventDefault()

    if (!otp || !newPassword || !confirmPassword) {
      alert('All fields are required!')
      return
    }

    if (otp.length < 6) {
      alert('OTP must be 6 digits!')
      return
    }

    if (newPassword !== confirmPassword) {
      alert('Passwords do not match!')
      return
    }

    console.log('OTP:', otp)
    console.log('New Password:', newPassword)
    alert('Password reset successfully!')
  }

  return (
    <main className='bg-zinc-950 flex h-screen items-center justify-center'>
      <section className='grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl mx-4 bg-white rounded-lg shadow-lg overflow-hidden'>
        {/* Image Section */}
        <article className='hidden lg:block relative'>
          <img
            src='/banner.png' // Replace with your image path
            alt='Reset Password Visual'
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
                Reset Your Password
              </CardTitle>
              <CardDescription className='text-center text-sm text-zinc-600'>
                Enter the OTP sent to your email and set a new password
              </CardDescription>
            </CardHeader>
            <CardContent>
              <form onSubmit={handleSubmit} className='space-y-4'>
                {/* OTP Input */}
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

                {/* New Password Field */}
                <div className='space-y-2'>
                  <label
                    htmlFor='newPassword'
                    className='text-sm font-medium text-zinc-700'
                  >
                    New Password
                  </label>
                  <input
                    type='password'
                    id='newPassword'
                    aria-label='New Password'
                    value={newPassword}
                    onChange={e => setNewPassword(e.target.value)}
                    className='w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-theme-primary'
                    required
                  />
                </div>

                {/* Confirm Password Field */}
                <div className='space-y-2'>
                  <label
                    htmlFor='confirmPassword'
                    className='text-sm font-medium text-zinc-700'
                  >
                    Confirm Password
                  </label>
                  <input
                    type='password'
                    id='confirmPassword'
                    aria-label='Confirm Password'
                    value={confirmPassword}
                    onChange={e => setConfirmPassword(e.target.value)}
                    className='w-full px-3 py-2 border rounded-md focus:ring-2 focus:ring-theme-primary'
                    required
                  />
                </div>

                {/* Submit Button */}
                <Button
                  type='submit'
                  className='w-full bg-theme-primary text-white font-medium py-2 rounded-md transition-colors duration-200'
                >
                  Reset Password
                </Button>
              </form>
            </CardContent>
            <CardFooter className='flex flex-col items-center space-y-4 py-6'>
              <div className='w-full border-t border-zinc-200 my-4'></div>
              <p className='text-sm text-zinc-600'>
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
      </section>
    </main>
  )
}
