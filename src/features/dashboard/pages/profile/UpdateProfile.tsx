/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Camera } from 'lucide-react'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import { Card } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { updateProfile } from '@/store/slices/updateUserSlice'
import { useEffect, useState } from 'react'
import { initializeUserData } from '@/store/slices/userSlice'
import { UpdateProfileSchema } from '@/models/zod-schema/zod.schema'
import FormField from '../../components/FormField'
import { Controller, FormProvider, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import data from '@/data/countries.json'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import {
  setSelectedCities,
  setSelectedCountry,
} from '@/store/slices/citiesCountriesSlice'
import MultipleSelect from '../../components/MultipleSelect'

type FormValues = z.infer<typeof UpdateProfileSchema>
interface CountryData {
  country: string
  cities: string[]
}
export default function UpdateProfile() {
  const { user } = useSelector((state: RootState) => state.user)
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
    field.id = Object.keys(UpdateProfileSchema.shape)[i]
  })

  const methods = useForm<FormValues>({
    resolver: zodResolver(UpdateProfileSchema),
    mode: 'onBlur',
  })
  const { handleSubmit, control } = methods

  const [avatar, setAvatar] = useState<string | undefined>(user?.image || '')
  const dispatch = useDispatch<AppDispatch>()

  const handleFileChange = async (
    event: React.ChangeEvent<HTMLInputElement>,
  ) => {
    const file = event.target.files?.[0]
    if (!file) return
    const fileFormData = new FormData()
    fileFormData.append('image', file)
    try {
      await dispatch(updateProfile(fileFormData)).unwrap()
      dispatch(initializeUserData())
    } catch (error) {
      console.error('Error uploading image:', error)
    }
  }
  const [localCities, setLocalCities] = useState<string[] | any>([])
  // const handleSubmit = async (e: React.FormEvent) => {
  //   e.preventDefault()
  //   try {
  //     await dispatch(updateProfile(formData)).unwrap()
  //     dispatch(initializeUserData())
  //   } catch (error) {
  //     console.error('Error updating profile:', error)
  //   }
  // }

  const onSubmit = (data: any) => {
    console.log(data)
  }
  useEffect(() => {
    setAvatar(user?.image)
  }, [user])
  const handleCountryChange = (country: string) => {
    dispatch(setSelectedCountry(country))
    const filteredData = data.find(
      (item: CountryData) => item.country === country,
    )

    setLocalCities(filteredData?.cities)
    if (filteredData) {
      dispatch(setSelectedCities(filteredData.cities))
    } else {
      dispatch(setSelectedCities([]))
    }
  }
  return (
    <div className='container mx-auto px-2 flex flex-col items-center'>
      <Card className='flex flex-col gap-6 rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow w-full'>
        <div className='relative group w-fit'>
          <div className='border-2 border-primary w-44 h-44 hover:border-theme-variant hover:scale-105 transition-transform rounded-full overflow-hidden'>
            <img
              className='w-full h-full object-cover'
              src={`http://44.201.100.137/${avatar}?t=${Date.now()}`}
              alt='User Avatar'
            />
          </div>
          <div className='absolute inset-0 flex items-center justify-center bg-black/50 opacity-0 group-hover:opacity-100 rounded-full transition-opacity cursor-pointer'>
            <label htmlFor='file-upload' className='cursor-pointer'>
              <Camera className='w-10 h-10 text-white' />
            </label>
          </div>
          <input
            id='file-upload'
            type='file'
            className='hidden'
            accept='image/*'
            onChange={handleFileChange}
          />
        </div>
        <FormProvider {...methods}>
          <form className='space-y-6 flex-1' onSubmit={handleSubmit(onSubmit)}>
            <div className='grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4'>
              {formFields.map(field => (
                <FormField
                  key={field.id}
                  id={field.id}
                  label={field.label}
                  placeholder={field.placeholder}
                  type={field.type}
                />
              ))}
            </div>
            <div className='w-full'>
              <label className='block text-sm font-medium mb-2'>Country</label>
              <Controller
                name='country'
                control={control}
                render={({ field }) => (
                  <Select
                    onValueChange={(value: string) => {
                      field.onChange(value)
                      handleCountryChange(value)
                    }}
                    value={field.value}
                  >
                    <SelectTrigger className='w-full'>
                      <SelectValue placeholder='Select a Country' />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectGroup>
                        <SelectLabel>Countries</SelectLabel>
                        {data.map((item: CountryData) => (
                          <SelectItem key={item.country} value={item.country}>
                            {item.country}
                          </SelectItem>
                        ))}
                      </SelectGroup>
                    </SelectContent>
                  </Select>
                )}
              />
            </div>

            {/* City Select */}
            <div className='w-full'>
              <label className='block text-sm font-medium mb-2'>City</label>
              <MultipleSelect options={localCities} />
            </div>
            <Button type='submit' className='w-full'>
              Save Changes
            </Button>
          </form>
        </FormProvider>
      </Card>
    </div>
  )
}
