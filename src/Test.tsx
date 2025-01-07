/* eslint-disable @typescript-eslint/no-explicit-any */
import Spinner from './components/custom/Spinner'
import FormField from './features/dashboard/components/FormField'
import { useForm, FormProvider } from 'react-hook-form' // Import FormProvider

export default function Test() {
  return (
    <div className='flex-col-center h-screen'>
      <h1 className='text-7xl font-extrabold'>Welcome to Dashboard</h1>
      <Spinner/>
    </div>
  )
}

export const MyForm = () => {
  // Initialize the form methods
  const methods = useForm()

  const onSubmit = (data: any) => {
    console.log('Form Data:', data)
  }

  return (
    <FormProvider {...methods}>
      <form onSubmit={methods.handleSubmit(onSubmit)}>
        <FormField
          label='Name'
          id='name'
          type='text'
          placeholder='Enter your name'
        />
        <FormField label='Birth Date' id='birthDate' type='date' />
        <button
          type='submit'
          className='mt-4 px-4 py-2 bg-blue-500 text-white rounded'
        >
          Submit
        </button>
      </form>
    </FormProvider>
  )
}
