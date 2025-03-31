import {
  Card,
  CardHeader,
  CardTitle,
  CardContent,
  CardFooter,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { FormProvider, useForm } from 'react-hook-form'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store.ts'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { LoginSchema } from '@/models/zod-schema/zod.schema'
import FormField from '../dashboard/components/FormField'
import { loginUser } from '@/store/slices/loginSlice'
import Spinner from '@/components/custom/Spinner'
import BannerAuthImage from '@/components/custom/auth-image/BannerAuthImage'
import DotPattern from '@/components/ui/dot-pattern'
import { cn } from '@/lib/utils'

type FormValues = z.infer<typeof LoginSchema>

export default function Login() {
  const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()
  const { loading } = useSelector((state: RootState) => state.login)
  const methods = useForm<FormValues>({
    resolver: zodResolver(LoginSchema),
  })

  const onSubmit = async (data: FormValues) => {
    const result = await dispatch(loginUser(data))
    if (loginUser.fulfilled.match(result)) {
      navigate('/home')
    } else return
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
      <DotPattern
        className={cn(
          '[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]',
          'inset-x-0 inset-y-[-20%] h-[150%]',
        )}
      />
      <main className='flex h-screen items-center justify-center lg:p-4 '>
        <section className='grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl mx-4 rounded-lg shadow-lg overflow-hidden z-20 bg-background border border-border'>
          <BannerAuthImage />
          <article className='lg:p-10 bg-background'>
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
                      onClick={() => navigate('/forget-password')}
                      className='font-medium text-foreground hover:underline'
                    >
                      Forgot password?
                    </Button>

                    <Button
                      type='submit'
                      className='w-full bg-foreground mt-6'
                      disabled={loading}
                    >
                      LOGIN
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className='flex flex-col items-center py-6'>
                  <p className='text-sm text-muted-foreground '>
                    Don't have an account?{' '}
                    <Link
                      to='/register'
                      className='font-medium text-foreground hover:underline'
                    >
                      SIGN UP
                    </Link>
                  </p>
                </CardFooter>
              </Card>
            </FormProvider>
          </article>
        </section>
        {loading && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <Spinner />
          </div>
        )}
      </main>
    </>
  )
}
