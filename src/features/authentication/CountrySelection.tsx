/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { Button } from '@/components/ui/button'
import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import data from '@/data/countries.json'
import {
  setSelectedCities,
  setSelectedCountry,
  userBase,
} from '@/store/slices/citiesCountriesSlice'

import { Controller, useForm } from 'react-hook-form'
import { useState } from 'react'
import Spinner from '@/components/custom/Spinner'
import { useNavigate } from 'react-router-dom'
import MultipleSelect from '../../components/controls/MultipleSelect'
import DotPattern from '@/components/ui/dot-pattern'
import { cn } from '@/lib/utils'
interface CountryData {
  country: string
  city: string[]
}
interface FormData {
  country: string
  city: string[]
}

export default function CountrySelection() {
  const navigate = useNavigate()
  const [localCities, setLocalCities] = useState<string[] | any>([])
  const { control, handleSubmit } = useForm<FormData>()
  const dispatch = useDispatch<AppDispatch>()
  const {
    selectedCities: city,
    selectedCountry: country,
    loading,
  } = useSelector((state: RootState) => state.citiesCountries)

  const handleCountryChange = (country: string) => {
    dispatch(setSelectedCountry(country))
    const filteredData = data.find(
      (item: CountryData) => item.country === country,
    )

    setLocalCities(filteredData?.city)
    if (filteredData) {
      dispatch(setSelectedCities(filteredData.city))
    } else {
      dispatch(setSelectedCities([]))
    }
  }

  const onSubmit = async () => {
    const paylaod = { city: city, country }
    await dispatch(userBase(paylaod))
    navigate('/home')
  }

  return (
    <>
      {' '}
      <DotPattern
        className={cn(
          '[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]',
          'inset-x-0 inset-y-[-50%] h-[150%]',
        )}
      />
      <main className='flex h-screen items-center justify-center '>
        <section className='w-full max-w-4xl mx-4 rounded-lg shadow-lg overflow-hidden z-20 bg-background'>
          <article className='lg:p-10 bg-background '>
            <Card className='w-full bg-transparent shadow-none'>
              <CardHeader className='space-y-2 text-center'>
                <CardTitle className='text-2xl font-bold'>
                  Where are you based?
                </CardTitle>
                <CardDescription className='text-sm text-zinc-600 dark:text-zinc-400'>
                  Let us know your location by selecting your country and city.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className='space-y-6 flex flex-col'
                >
                  {/* Country Select */}
                  <div className='w-full'>
                    <label className='block text-sm font-medium mb-2'>
                      Country
                    </label>
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
                                <SelectItem
                                  key={item.country}
                                  value={item.country}
                                >
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
                    <label className='block text-sm font-medium mb-2'>
                      City
                    </label>
                    <MultipleSelect options={localCities} />
                  </div>

                  <Button type='submit' className='w-full'>
                    Submit
                  </Button>
                </form>
              </CardContent>
            </Card>
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
