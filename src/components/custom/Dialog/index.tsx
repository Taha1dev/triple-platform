/* eslint-disable @typescript-eslint/no-unused-vars */
import FormField, { FormFieldProps } from '@/app/dashboard/components/FormField'
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from '@/components/ui/alert-dialog'
import { Button } from '@/components/ui/button'
import { useForm } from 'react-hook-form'
interface FormValues {
  email: string
}
export function Dialog() {
  const form = useForm<FormValues>()
  const { register, handleSubmit, formState } = form
  const FormFields: FormFieldProps[] = [
    {
      id: '1',
      label: 'Email',
      placeholder: 'Enter your Email',
      register: register,
      type: 'email',
      formState: formState,
      required: true,
    },
  ]
  const onSubmit = (data: FormValues) => {
    console.log('Form data submitted:', data)
  }
  return (
    <AlertDialog defaultOpen>
      {/* <AlertDialogTrigger asChild >
        <Button variant='outline'>Show Dialog</Button>
      </AlertDialogTrigger> */}
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This action cannot be undone. This will permanently delete your
            account and remove your data from our servers.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction>Continue</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
    // <AlertDialog defaultOpen>
    //   <AlertDialogTrigger asChild></AlertDialogTrigger>
    //   <AlertDialogContent>
    //     <AlertDialogHeader>
    //       <AlertDialogTitle>{ques}</AlertDialogTitle>
    //       <AlertDialogDescription>
    //         {body}
    //         <form onSubmit={handleSubmit(onSubmit)}>
    //           {FormFields.map(e => {
    //             return <FormField {...e} />
    //           })}
    //         </form>
    //       </AlertDialogDescription>
    //     </AlertDialogHeader>
    //     <AlertDialogFooter>
    //       <AlertDialogCancel>Cancel</AlertDialogCancel>
    //       <AlertDialogAction>Continue</AlertDialogAction>
    //     </AlertDialogFooter>
    //   </AlertDialogContent>
    // </AlertDialog>
  )
}
