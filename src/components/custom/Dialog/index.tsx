/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import React from 'react'
import FormField from '@/app/dashboard/components/FormField'
import { setIsDialogOpen } from '@/app/store/openDialogSlice'
import { AppDispatch } from '@/app/store'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog'
import { FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useDispatch } from 'react-redux'
import { DialogSchema } from '@/app/zod-schema/zod.schema'

type FormValues = z.infer<typeof DialogSchema>

interface DialogProps {
  body: string
  ques: string
}

export const Dialog: React.FC<DialogProps> = ({ body, ques }) => {
  const dispatch = useDispatch<AppDispatch>()
  const methods = useForm<FormValues>({
    resolver: zodResolver(DialogSchema),
  })
  const { reset, handleSubmit, getValues } = methods

  const handleOpenChange = (open: boolean) => {
    console.log('enter')
    console.log('is open', open)
    dispatch(setIsDialogOpen(open))
    if (!open && !getValues()) {
      console.log('e2')
      reset()
    }
  }

  const onSubmit = (data: FormValues) => {
    console.log('onSubmit')
    console.log('Form data submitted:', data)
    handleOpenChange(false)
  }

  const FormFields = [
    {
      id: 'email',
      label: 'Email',
      placeholder: 'Enter your Email',
      type: 'email',
    },
  ]

  return (
    <AlertDialog onOpenChange={handleOpenChange} defaultOpen>
      <AlertDialogContent className='sm:max-w-[425px]'>
        <AlertDialogHeader>
          <AlertDialogTitle className='text-xl font-semibold'>
            {ques}
          </AlertDialogTitle>
          <AlertDialogDescription className='mt-2 text-zinc-600 dark:text-zinc-400'>
            <p className='mb-4'>{body}</p>
            <FormProvider {...methods}>
              <form className='space-y-4 border-t border-zinc-200 pt-4 dark:border-zinc-800'>
                {FormFields.map(field => (
                  <FormField key={field.id} {...field} />
                ))}
                <div className='flex justify-end space-x-2'>
                  <AlertDialogCancel className='bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700'>
                    Cancel
                  </AlertDialogCancel>
                  <AlertDialogAction
                    type='submit'
                    onClick={handleSubmit(onSubmit)}
                    className='bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-100'
                  >
                    Continue
                  </AlertDialogAction>
                </div>
              </form>
            </FormProvider>
          </AlertDialogDescription>
        </AlertDialogHeader>
      </AlertDialogContent>
    </AlertDialog>
  )
}
