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
import FormField from '../components/FormField'
import { useDispatch, useSelector } from 'react-redux'
import { registerUser, resetState } from '@/store/slices/registerSlice'
import { AppDispatch, RootState } from '@/store/store'
import { useEffect } from 'react'
import Spinner from '@/components/custom/Spinner'
import { setPath } from '@/store/slices/routerSlice'
import BannerAuthImage from '@/components/custom/auth-image/BannerAuthImage'
import { Separator } from '@/components/ui/separator'

type FormValues = z.infer<typeof RegisterSchema>

export default function Register() {
  const navigate = useNavigate()
  const methods = useForm<FormValues>({
    resolver: zodResolver(RegisterSchema),
  })

  const dispatch = useDispatch<AppDispatch>()
  const { error, loading } = useSelector((state: RootState) => state.register)

  useEffect(() => {
    return () => {
      dispatch(resetState())
    }
  }, [dispatch, error, loading])
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
    await dispatch(registerUser(data))
    dispatch(setPath('/select-country'))
    navigate('/otp-verification')
  }

  return (
    <>
      <main className='flex min-h-screen items-center justify-center'>
        <section className='grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl mx-4 rounded-lg border shadow-sm overflow-hidden'>
          {/* Image Section */}
          <BannerAuthImage />

          {/* Form Section */}
          <article className='p-4 lg:p-10 bg-background'>
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
                      {loading ? 'Registering...' : 'Register'}
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
