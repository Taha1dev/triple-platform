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
import { Link } from 'react-router-dom'
import { Footer, NavBar } from '@/features/landing-page/components.barel'
import { RegisterSchema } from '@/models/zod-schema/zod.schema'
import FormField from '../components/FormField'

// Validation Schema

type FormValues = z.infer<typeof RegisterSchema>

export default function Register() {
  const methods = useForm<FormValues>({
    resolver: zodResolver(RegisterSchema),
  })

  const onSubmit = (data: FormValues) => {
    console.log('ssssssssssss')
    console.log('Form data submitted:', data)
  }

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
  return (
    <>
      <NavBar showLinks={false} />
      <main className='flex h-screen items-center justify-center'>
        <Card className='grid grid-cols-1 lg:grid-cols-2 w-full max-w-6xl mx-4 rounded-lg shadow-lg overflow-hidden'>
          {/* Image Section */}
          <article className='hidden lg:block relative'>
            <img
              src='/banner.png'
              alt='Register Visual'
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
                    Create Your Account
                  </CardTitle>
                  <p className='text-center text-sm text-zinc-600 dark:text-theme-secondary/80'>
                    Join us to get started on your journey
                  </p>
                </CardHeader>
                <CardContent>
                  <form
                    onSubmit={methods.handleSubmit(onSubmit)}
                    className='space-y-4'
                  >
                    <div className='grid grid-cols-1 sm:grid-cols-2 gap-4'>
                      {formFields.map(field => (
                        <div key={field.id}>
                          <FormField
                            id={field.id}
                            label={field.label}
                            placeholder={field.placeholder}
                            type={field.type}
                          />
                        </div>
                      ))}
                    </div>
                    <Button
                      type='submit'
                      className='w-full bg-foreground hover:bg-foreground/95 font-medium py-2 rounded-md transition-colors duration-200 mt-6'
                    >
                      REGISTER
                    </Button>
                  </form>
                </CardContent>
                <CardFooter className='flex flex-col items-center space-y-4 py-6'>
                  <div className='w-full border-t border-zinc-200 my-4'></div>
                  <p className='text-sm text-zinc-600 dark:text-theme-secondary/80'>
                    Already have an account?{' '}
                    <Link
                      to='/login'
                      className='font-medium text-theme-variant hover:underline transition-colors duration-200'
                    >
                      LOGIN
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
