/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'
import { Loader2 } from 'lucide-react'

import { Button } from '@/components/ui/button'
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form'
import { Card } from '@/components/ui/card'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Checkbox } from '@/components/ui/checkbox'
import { AppDispatch, RootState } from '@/store/store'
import { useDispatch, useSelector } from 'react-redux'
import { fetchAppearance } from '@/store/slices/getApperanceDetails'
import Spinner from '../custom/Spinner'
import { updateApperance } from '@/store/slices/updateApperanceSlice'
import { Input } from '../ui/input'

const appearanceSchema = z.object({
  ethnicity: z.string().optional(),
  hairColor: z.string().optional(),
  hairTexture: z.string().optional(),
  eyeColor: z.string().optional(),
  weight: z
    .number()
    .min(30, 'Weight must be at least 30kg')
    .max(300, 'Weight must be less than 300kg'),
  height: z
    .number()
    .min(100, 'Height must be at least 100cm')
    .max(250, 'Height must be less than 250cm'),
  skinTone: z.string().optional(),
  facialFeatures: z.array(z.string()).optional(),
  tattoo: z.string().optional(),
  piercing: z.string().optional(),
  scars: z.string().optional(),
})

type AppearanceFormValues = z.infer<typeof appearanceSchema>

export default function AppearanceDetailsForm() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { appearance, loading } = useSelector(
    (state: RootState) => state.apperanceDetails,
  )
  const  user  = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>()

  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(fetchAppearance()).unwrap()
      
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }

    fetchData()
    /* eslint-disable react-hooks/exhaustive-deps */
  }, [dispatch])

  const defaultValues: Partial<AppearanceFormValues> = {
    ethnicity: '',
    hairColor: '',
    hairTexture: '',
    eyeColor: '',
    skinTone: '',
    weight: 0,
    height: 0,
    facialFeatures: [],
    tattoo: '',
    piercing: '',
    scars: '',
  }

  const form = useForm<AppearanceFormValues>({
    resolver: zodResolver(appearanceSchema),
    defaultValues,
  })

  async function onSubmit(data: AppearanceFormValues) {
    setIsSubmitting(true)
    const payload = {
      ...data,
      user_id: (user as any).user._id,
      fcm_token: (user as any).token,
    }

    try {
      await dispatch(updateApperance(payload)).unwrap()
    } catch (error) {
      console.error('Error updating appearance details:', error)
      setIsSubmitting(false)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Card className='p-4'>
            <FormField
              control={form.control}
              name='ethnicity'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Ethnicity</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select ethnicity' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {appearance &&
                        appearance[0]?.ethnicity?.map(option => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>

          <Card className='p-4'>
            <FormField
              control={form.control}
              name='skinTone'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Skin Tone</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select skin tone' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {appearance &&
                        appearance[0]?.skinTone?.map(option => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>
        </div>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <Card className='p-4'>
            <FormField
              control={form.control}
              name='hairColor'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hair Color</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select hair color' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {appearance &&
                        appearance[0]?.hairColor?.map(option => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>

          <Card className='p-4'>
            <FormField
              control={form.control}
              name='hairTexture'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Hair Texture</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select hair texture' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {appearance &&
                        appearance[0]?.hairTexture?.map(option => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>

          <Card className='p-4'>
            <FormField
              control={form.control}
              name='eyeColor'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Eye Color</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select eye color' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {appearance &&
                        appearance[0]?.eyeColor?.map(option => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>
        </div>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <Card className='p-4'>
            <FormField
              control={form.control}
              name='weight'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Weight (kg)</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Enter weight in kg'
                      {...field}
                      onChange={e =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
                      min={30}
                      max={300}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>

          <Card className='p-4'>
            <FormField
              control={form.control}
              name='height'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Height (cm)</FormLabel>
                  <FormControl>
                    <Input
                      type='number'
                      placeholder='Enter height in cm'
                      {...field}
                      onChange={e =>
                        field.onChange(parseInt(e.target.value) || 0)
                      }
                      min={100}
                      max={250}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>
        </div>

        <Card className='p-4'>
          <FormField
            control={form.control}
            name='facialFeatures'
            render={() => (
              <FormItem>
                <FormLabel>Facial Features</FormLabel>
                <FormDescription className='mb-3'>
                  Select all facial features that apply to you.
                </FormDescription>
                <div className='grid grid-cols-2 md:grid-cols-3 gap-2'>
                  {appearance &&
                    appearance[0]?.facialFeatures?.map(feature => (
                      <FormField
                        key={feature}
                        control={form.control}
                        name='facialFeatures'
                        render={({ field }) => {
                          return (
                            <FormItem
                              key={feature}
                              className='flex flex-row items-start space-x-3 space-y-0 rounded-md p-2'
                            >
                              <FormControl>
                                <Checkbox
                                  checked={field.value?.includes(feature)}
                                  onCheckedChange={checked => {
                                    const currentValues = field.value || []
                                    if (checked) {
                                      field.onChange([
                                        ...currentValues,
                                        feature,
                                      ])
                                    } else {
                                      field.onChange(
                                        currentValues.filter(
                                          value => value !== feature,
                                        ),
                                      )
                                    }
                                  }}
                                />
                              </FormControl>
                              <FormLabel className='font-normal cursor-pointer'>
                                {feature}
                              </FormLabel>
                            </FormItem>
                          )
                        }}
                      />
                    ))}
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </Card>

        <div className='grid grid-cols-1 md:grid-cols-3 gap-6'>
          <Card className='p-4'>
            <FormField
              control={form.control}
              name='tattoo'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Tattoos</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select tattoo option' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {appearance &&
                        appearance[0]?.tattoo?.map(option => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>

          <Card className='p-4'>
            <FormField
              control={form.control}
              name='piercing'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Piercings</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select piercing option' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {appearance &&
                        appearance[0]?.piercing?.map(option => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>

          <Card className='p-4'>
            <FormField
              control={form.control}
              name='scars'
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Scars</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder='Select scar option' />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {appearance &&
                        appearance[0]?.scars?.map(option => (
                          <SelectItem key={option} value={option}>
                            {option}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </Card>
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
            'Save Appearance Details'
          )}
        </Button>
      </form>
      {loading && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50'>
          <Spinner />
        </div>
      )}
    </Form>
  )
}
