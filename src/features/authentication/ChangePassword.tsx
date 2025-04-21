/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
  CardContent,
} from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import FormField from '../../components/controls/FormField'
import { useForm, FormProvider } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { changePasswordSchema } from '@/models/zod-schema/zod.schema'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { useNavigate } from 'react-router-dom'
import Spinner from '@/components/custom/Spinner'
import { changePassword } from '@/store/slices/changePasswordSlice'

type FormValues = z.infer<typeof changePasswordSchema>

export default function ChangePassword() {
  const navigate = useNavigate()
  const methods = useForm<FormValues>({
    resolver: zodResolver(changePasswordSchema),
  })
  const dispatch = useDispatch<AppDispatch>()
  const { user } = useSelector((state: RootState) => state.user)
  const { loading } = useSelector((state: RootState) => state.changePassword)
  const { handleSubmit } = methods

  const onSubmit = async (data: FormValues) => {
    const { password } = data
    console.log((user as any)?.user._id)
    try {
      await dispatch(
        changePassword({ _id: (user as any)?.user._id, password }),
      ).unwrap()
      navigate('/home')
    } catch (error) {
      console.log(error)
    }
  }
  return (
    <div className='h-full flex-col-center '>
      <Card className='grid grid-cols-1 items-center w-full max-w-3xl mx-4 rounded-lg shadow-lg border-transparent overflow-hidden'>
        {/* Form Section */}
        <article className='p-8'>
          <FormProvider {...methods}>
            <Card className='bg-transparent shadow-none'>
              <CardHeader className='space-y-2'>
                <CardTitle className='text-center text-2xl font-bold'>
                  Change Your Password
                </CardTitle>
                <CardDescription className='text-center text-sm text-zinc-600 dark:text-theme-secondary/80'>
                  Enter your new password here.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className='space-y-4'>
                  <FormField
                    name='password'
                    label={'New Password'}
                    id={'password'}
                    placeholder={'Enter Your New Password'}
                    type={'password'}
                  />
                  <Button
                    type='submit'
                    className='w-full bg-foreground hover:bg-foreground/95 font-medium py-2 rounded-md transition-colors duration-200'
                  >
                    Change Password
                  </Button>
                </form>
              </CardContent>
            </Card>
          </FormProvider>
        </article>
        {loading && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
            <Spinner />
          </div>
        )}
      </Card>
    </div>
  )
}
