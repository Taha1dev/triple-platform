import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FormProvider, useForm } from 'react-hook-form'
import FormField from '../components/FormField'
import { Link } from 'react-router-dom'
import { Dialog } from '@/components/custom/Dialog'
import { Footer } from '@/app/landing-page/components.barel'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/app/store'
import { toggleDialog } from '@/app/features/openDialogSlice'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { LoginSchema } from '@/app/zod-schema/zod.schema'
type FormValues = z.infer<typeof LoginSchema>
export default function Login() {
  const isDialogOpen = useSelector(
    (state: RootState) => state.dialog.isDialogOpen,
  )
  const dispatch = useDispatch<AppDispatch>()

  const methods = useForm<FormValues>({
    resolver: zodResolver(LoginSchema),
  })
  const onSubmit = (data: FormValues) => {
    console.log('Form data submitted:', data)
  }

  const FormFields = [
    {
      id: 'email',
      label: 'Email',
      placeholder: 'Enter your Email',
      type: 'email',
    },
    {
      id: 'password',
      label: 'Password',
      placeholder: 'Enter your Password',
      type: 'password',
    },
  ]

  return (
    <>
      <main className='flex h-screen items-center justify-center'>
        <Card className='grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl mx-4 rounded-lg shadow-lg overflow-hidden'>
          <article className='hidden lg:block relative'>
            <img
              src='/banner.png'
              alt='Login Visual'
              className='w-full h-full object-cover'
            />
            <footer className='absolute inset-0 bg-opacity-40 flex items-end p-6'>
              <p className='text-sm'>
                © {new Date().getFullYear()} Triple Platform. All rights
                reserved. Crafted with 🖤
              </p>
            </footer>
          </article>

          <article className='p-8'>
            <FormProvider {...methods}>
              <Card className='bg-transparent shadow-none'>
                <CardHeader className='space-y-2'>
                  <CardTitle className='text-center text-2xl font-bold'>
                    Welcome Back
                  </CardTitle>
                  <p className='text-center text-sm text-zinc-600 dark:text-theme-secondary/80'>
                    Please log in to your account
                  </p>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className='space-y-4'
                  >
                    {FormFields.map(field => (
                      <div key={field.id} className='w-full'>
                        <FormField
                          id={field.id}
                          label={field.label}
                          placeholder={field.placeholder}
                          type={field.type}
                        />
                      </div>
                    ))}
                    <Button
                      variant={'link'}
                      type='button'
                      onClick={() => dispatch(toggleDialog())}
                      className='text-sm text-theme-variant hover:underline'
                    >
                      Forgot password?
                    </Button>
                    {isDialogOpen && (
                      <Dialog
                        ques='Forgot your password?'
                        body='Please enter your email address below.'
                      />
                    )}
                    <Button type='submit' className='w-full bg-foreground mt-6'>
                      LOGIN
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className='flex flex-col items-center py-6'>
                  <p className='text-sm text-zinc-600'>
                    Don't have an account?{' '}
                    <Link
                      to='/register'
                      className='font-medium text-theme-variant hover:underline'
                    >
                      SIGN UP
                    </Link>
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
