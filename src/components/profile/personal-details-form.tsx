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
import FormField from '@/components/controls/FormField'
import { MultiSelect } from '@/components/controls/multi-select'
import { Textarea } from '../ui/textarea'
import { Label } from '../ui/label'
import { cn } from '@/lib/utils'

const schema = z.object({
  fname: z.string().min(2, 'First name must be at least 2 characters.'),
  lname: z.string().min(2, 'Last name must be at least 2 characters.'),
  dob: z.any(),
  email: z.string().email(),
  bio: z.string().max(500, 'Bio must not exceed 500 characters.').optional(),
  contact_number: z
    .string()
    .min(6, 'Contact number must be at least 6 digits.'),
  country: z.array(z.string()).min(1, 'At least one country is required'),
  city: z.array(z.string()).min(1, 'At least one city is required'),
})

type FormValues = z.infer<typeof schema>

export default function PersonalDetailsForm() {
  const user = useSelector((state: RootState) => state.user)

  const [profileUser, setProfileUser] = useState<any>()
  const methods = useForm<FormValues>({
    resolver: zodResolver(schema),
    defaultValues: {
      fname: '',
      lname: '',
      dob: new Date('1999-01-01'),
      bio: '',
      email: '',
      contact_number: '',
      country: [],
      city: [],
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

  const formCountries = watch('country')
  const formCities = watch('city')

  const allCountries = countriesData.map(item => item.country)

  const availableCities =
    formCountries.length > 0
      ? countriesData
          .filter(item => formCountries.includes(item.country))
          .flatMap(item => item.city)
      : []

  const onSubmit = async (data: FormValues) => {
    try {
      setIsSubmitting(true)

      const formData = {
        ...data,
        country: data.country.join(','),
        city: data.city.join(','),
      }
      await dispatch(updateProfile(formData as any)).unwrap()
    } catch (error) {
      console.error('Update failed:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  useEffect(() => {
    if (user) {
      setProfileUser(user)

      methods.reset({
        fname: user.fname || '',
        lname: user.lname || '',
        dob: user.dob ? new Date(user.dob) : new Date('1999-01-01'),
        bio: user.bio || '',
        email: user.email || '',
        contact_number: user.contact_number || '',
        country: Array.isArray(user.country)
          ? user.country
          : [user.country].filter(Boolean),
        city: Array.isArray(user.city)
          ? user.city
          : [user.city].filter(Boolean),
      })
    }
  }, [user, methods])
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
                setValue('country', selected, { shouldValidate: true })

                setValue('city', [], { shouldValidate: true })
              }}
              placeholder='Select countries'
            />
            {errors.country && (
              <p className='mt-1 text-sm text-red-600'>
                {errors.country.message}
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
                setValue('city', selected, { shouldValidate: true })
              }}
              placeholder={
                formCountries.length > 0
                  ? 'Select cities'
                  : 'Select countries first'
              }
              disabled={formCountries.length === 0}
            />
            {errors.city && (
              <p className='mt-1 text-sm text-red-600'>{errors.city.message}</p>
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
    </FormProvider>
  )
}
