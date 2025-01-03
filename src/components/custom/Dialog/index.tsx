// /* eslint-disable @typescript-eslint/no-explicit-any */
// import FormField, { FormFieldProps } from '@/app/dashboard/components/FormField'
// import { setIsDialogOpen } from '@/app/features/openDialogSlice'
// import { AppDispatch } from '@/app/store'
// import {
//   AlertDialog,
//   AlertDialogAction,
//   AlertDialogCancel,
//   AlertDialogContent,
//   AlertDialogDescription,
//   AlertDialogFooter,
//   AlertDialogHeader,
//   AlertDialogTitle,
// } from '@/components/ui/alert-dialog'

// import { useDispatch } from 'react-redux'

// interface FormValues {
//   email: string
// }

// export function Dialog({ body, ques }: any) {
//   const dispatch = useDispatch<AppDispatch>()

//   const handleOpenChange = (open: boolean) => {
//     dispatch(setIsDialogOpen(open))
//     if (!open) {
//       reset()
//     }
//   }

//   const handleContinue = () => {
//     handleSubmit(onSubmit)()
//   }

//   const FormFields: FormFieldProps[] = [
//     {
//       id: '1',
//       label: 'Email',
//       placeholder: 'Enter your Email',
//       type: 'email',
//     },
//   ]

//   const onSubmit = (data: FormValues) => {
//     console.log('Form data submitted:', data)
//   }

//   return (
//     <AlertDialog onOpenChange={handleOpenChange} defaultOpen>
//       <AlertDialogContent className='sm:max-w-[425px]'>
//         <AlertDialogHeader>
//           <AlertDialogTitle className='text-xl font-semibold'>
//             {ques}
//           </AlertDialogTitle>
//           <AlertDialogDescription className='mt-2 text-zinc-600 dark:text-zinc-400'>
//             <p className='mb-4'>{body}</p>
//             <form
//               className='space-y-4 border-t border-zinc-200 pt-4 dark:border-zinc-800'
//               onSubmit={handleSubmit(onSubmit)}
//             >
//               {FormFields.map((e, index) => (
//                 <FormField key={index} {...e} />
//               ))}
//             </form>
//           </AlertDialogDescription>
//         </AlertDialogHeader>
//         <AlertDialogFooter className='mt-4'>
//           <AlertDialogCancel className='bg-zinc-100 text-zinc-900 hover:bg-zinc-200 dark:bg-zinc-800 dark:text-zinc-100 dark:hover:bg-zinc-700'>
//             Cancel
//           </AlertDialogCancel>
//           <AlertDialogAction
//             onClick={handleContinue}
//             className='bg-zinc-900 text-zinc-50 hover:bg-zinc-800 dark:bg-zinc-50 dark:text-zinc-900 dark:hover:bg-zinc-100'
//           >
//             Continue
//           </AlertDialogAction>
//         </AlertDialogFooter>
//       </AlertDialogContent>
//     </AlertDialog>
//   )
// }
