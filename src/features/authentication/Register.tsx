/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { useForm, FormProvider } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { Link, useNavigate } from 'react-router-dom'
import { RegisterSchema } from '@/models/zod-schema/zod.schema'
import FormField from '../dashboard/components/FormField'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser } from '@/store/slices/registerSlice'
import { AppDispatch, RootState } from '@/store/store'
import Spinner from '@/components/custom/Spinner'
import { setPath } from '@/store/slices/routerSlice'
import BannerAuthImage from '@/components/custom/auth-image/BannerAuthImage'
import { Separator } from '@/components/ui/separator'
import { setEmail } from '@/store/slices/emailSlice'
import { setSub, setTitle } from '@/store/slices/otpContentSlice'
import { cn } from '@/lib/utils'
import DotPattern from '@/components/ui/dot-pattern'

type FormValues = z.infer<typeof RegisterSchema>

export default function Register() {
  const navigate = useNavigate()
  const methods = useForm<FormValues>({
    resolver: zodResolver(RegisterSchema),
  })

  const dispatch = useDispatch<AppDispatch>()
  const { loading } = useSelector((state: RootState) => state.register)

  const formFields = [
    {
      id: 'fname',
      label: 'First Name',
      placeholder: 'Enter your First Name',
      type: 'text',
    },
    {
      id: 'lName',
      label: 'Last Name',
      placeholder: 'Enter your Last Name',
      type: 'text',
    },
    {
      id: 'email',
      label: 'Email',
      placeholder: 'Enter your Email Address',
      type: 'email',
    },
    {
      id: 'contact_number',
      label: 'Phone Number',
      placeholder: 'Enter your Phone Number',
      type: 'text',
    },
    {
      id: 'password',
      label: 'Password',
      placeholder: 'Enter your Password',
      type: 'password',
    },
    {
      id: 'dob',
      label: 'Birth Date',
      placeholder: 'Enter your Birth Date',
      type: 'date',
    },
  ]
  formFields.map((field, i) => {
    field.id = Object.keys(RegisterSchema.shape)[i]
  })

  const onSubmit = async (data: FormValues) => {
    await dispatch(registerUser(data)).unwrap()
    dispatch(setEmail(data.email))
    dispatch(setTitle('Verify Your Email'))
    dispatch(setSub('An OTP has been sent to your email for verification.'))
    dispatch(setPath('/select-country'))
    navigate('/otp-verification')
  }

  return (
    <>
      {' '}
      <DotPattern
        className={cn(
          '[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]',
          'inset-x-0 inset-y-[-20%] h-[150%]',
        )}
      />
      <main className='flex min-h-screen items-center justify-center'>
        <section className='grid grid-cols-1 lg:grid-cols-5 w-full max-w-6xl mx-4 rounded-lg border shadow-sm overflow-hidden  z-20 bg-background'>
          {/* Image Section */}
          <BannerAuthImage className='col-span-2' />

          {/* Form Section */}
          <article className='p-4 lg:p-10 bg-background col-span-3'>
            <FormProvider {...methods}>
              <Card className='bg-transparent shadow-none'>
                <CardHeader className='space-y-3'>
                  <CardTitle className='text-center text-2xl font-semibold'>
                    Create Your Account
                  </CardTitle>
                  <p className='text-center text-sm text-muted-foreground'>
                    Join us to get started on your journey
                  </p>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className='space-y-6'
                  >
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                      {formFields.map(field => (
                        <FormField
                          key={field.id}
                          id={field.id}
                          label={field.label}
                          placeholder={field.placeholder}
                          type={field.type}
                        />
                      ))}
                    </div>
                    <Button type='submit' className='w-full' disabled={loading}>
                      Register
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className='flex flex-col items-center space-y-4 py-6'>
                  <Separator />
                  <p className='text-sm text-muted-foreground'>
                    Already have an account?{' '}
                    <Link
                      to='/login'
                      className='font-medium text-foreground hover:underline'
                    >
                      LOGIN
                    </Link>
                  </p>
                </CardFooter>
              </Card>
            </FormProvider>
          </article>
        </section>
        {loading && (
          <div className='fixed inset-0 bg-black/50 flex items-center justify-center z-50'>
            <Spinner />
          </div>
        )}
      </main>
    </>
  )
}
