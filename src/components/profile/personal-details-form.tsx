/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useState } from 'react'
import { useForm, FormProvider, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import * as z from 'zod'
import countriesData from '@/data/countries.json'
import { Button } from '@/components/ui/button'
import { Loader2 } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { updateProfile } from '@/store/slices/updateUserSlice'
import FormField from '@/features/dashboard/components/controls/FormField'
import { MultiSelect } from '@/features/dashboard/components/controls/multi-select'
import { initializeUserData } from '@/store/slices/userSlice'
import Spinner from '../custom/Spinner'
import { Textarea } from '../ui/textarea'
import { Label } from '../ui/label'
import { cn } from '@/lib/utils'

// Define validation schema
const schema = z.object({
  fname: z.string().min(2, 'First name must be at least 2 characters.'),
  lname: z.string().min(2, 'Last name must be at least 2 characters.'),
  dob: z.any(),
  bio: z.string().max(500, 'Bio must not exceed 500 characters.').optional(),
  contact_number: z
    .string()
    .min(6, 'Contact number must be at least 6 digits.'),
  countries: z.array(z.string()).min(1, 'At least one country is required'),
  cities: z.array(z.string()).min(1, 'At least one city is required'),
})

type FormValues = z.infer<typeof schema>

export default function PersonalDetailsForm() {
  const { user, loading, initialized } = useSelector(
    (state: RootState) => state.user,
  )
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [profileUser, setProfileUser] = useState<any>()
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fname: '',
      lname: '',
      dob: new Date('1999-01-01'),
      bio: '',
      contact_number: '',
      countries: [],
      cities: [],
    },
  })

  const {
    handleSubmit,
    setValue,
    watch,
    formState: { errors },
  } = methods

  const dispatch = useDispatch<AppDispatch>()
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Watch the form values
  const formCountries = watch('countries')
  const formCities = watch('cities')

  // Get all unique countries from the data
  const allCountries = countriesData.map(item => item.country)

  // Get cities for all selected countries (flattened array)
  const availableCities =
    formCountries.length > 0
      ? countriesData
          .filter(item => formCountries.includes(item.country))
          .flatMap(item => item.cities)
      : []

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true)

      // Prepare the data to send
      const formData = {
        ...data,
        // Convert arrays to comma-separated strings if your backend expects that
        countries: data.countries.join(','),
        cities: data.cities.join(','),
      }

      await dispatch(updateProfile(formData as any)).unwrap()
    } catch (error) {
      console.error('Update failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }
  useEffect(() => {
    dispatch(initializeUserData())
  }, [dispatch])

  useEffect(() => {
    if (initialized && !loading && (user as any)?.user) {
      setProfileUser(user)

      // Parse the user data into the form's expected format
      methods.reset({
        fname: (user as any)?.user.fname || '',
        lname: (user as any)?.user.lname || '',
        dob: (user as any)?.user.dob
          ? new Date((user as any)?.user.dob)
          : new Date('1999-01-01'),
        bio: (user as any)?.user.bio || '',
        contact_number: (user as any)?.user.contact_number || '',
        countries: (user as any)?.user.countries
          ? (user as any)?.user.countries.split(',')
          : [],
        cities: (user as any)?.user.cities
          ? (user as any)?.user.cities.split(',')
          : [],
      })
    }
  }, [user, initialized, loading, methods])
  return (
    <FormProvider {...methods}>
      <form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <FormField
            name={'fname'}
            defaultValue={profileUser?.user?.fname || ''}
            id='fname'
            label='First Name'
            placeholder='Enter your first name'
          />
          <FormField
            name={'lname'}
            defaultValue={profileUser?.user?.lname || ''}
            id='lname'
            label='Last Name'
            placeholder='Enter your last name'
          />
        </div>

        <FormField name='dob' id='dob' label='Date of Birth' type='date' />
        <Label htmlFor={'bio'} className='font-medium mb-1 ml-1'>
          Bio
        </Label>
        <Controller
          name='bio'
          render={({ field }) => (
            <Textarea
              {...field}
              id='bio'
              className={cn(
                'w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50',
                errors.bio && 'border-red-500',
              )}
              placeholder='Tell us about yourself'
            />
          )}
        />

        <FormField
          name='contact_number'
          id='contact_number'
          defaultValue={profileUser?.user?.contact_number || ''}
          label='Contact Number'
          type='number'
          placeholder='Enter your contact number'
        />
        <FormField
          name='email'
          id='email'
          defaultValue={profileUser?.user?.email || ''}
          label='Email Adrress'
          type='email'
          disabled
        />

        <div className='flex items-center gap-4 '>
          <div className='w-full'>
            <label className='block text-sm font-medium mb-2 ml-1'>
              Countries
            </label>
            <MultiSelect
              options={allCountries}
              selected={formCountries}
              onChange={selected => {
                setValue('countries', selected, { shouldValidate: true })

                setValue('cities', [], { shouldValidate: true })
              }}
              placeholder='Select countries'
            />
            {errors.countries && (
              <p className='mt-1 text-sm text-red-600'>
                {errors.countries.message}
              </p>
            )}
          </div>

          <div className='w-full'>
            <label className='block text-sm font-medium mb-2 ml-1'>
              Cities
            </label>
            <MultiSelect
              options={availableCities}
              selected={formCities}
              onChange={selected => {
                setValue('cities', selected, { shouldValidate: true })
              }}
              placeholder={
                formCountries.length > 0
                  ? 'Select cities'
                  : 'Select countries first'
              }
              disabled={formCountries.length === 0}
            />
            {errors.cities && (
              <p className='mt-1 text-sm text-red-600'>
                {errors.cities.message}
              </p>
            )}
          </div>
        </div>

        <Button
          type='submit'
          disabled={isSubmitting}
          className='w-full md:w-auto'
        >
          {isSubmitting ? (
            <>
              <Loader2 className='mr-2 h-4 w-4 animate-spin' />
              Saving...
            </>
          ) : (
            'Save Personal Details'
          )}
        </Button>
      </form>
      {loading && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <Spinner />
        </div>
      )}
    </FormProvider>
  )
}
