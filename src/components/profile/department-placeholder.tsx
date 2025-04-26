/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react'
import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Form, FormField, FormMessage } from '@/components/ui/form'
import { AppDispatch, RootState } from '@/store/store'
import { useDispatch, useSelector } from 'react-redux'
import { updateCategories } from '@/store/slices/updateCategories'
import Spinner from '../custom/Spinner'
import { MultiSelect } from '@/components/controls/multi-select'
import { getallCategories } from '@/store/slices/getAllCategoriesSlice'

interface User {
  user: {
    _id: string
  }
}

const departmentSchema = z.object({
  categories: z.array(z.string()).min(1, 'At least one category is required'),
  subCategories: z
    .array(z.string())
    .min(1, 'At least one subcategory is required'),
})

type DepartmentFormValues = z.infer<typeof departmentSchema>

export default function DepartmentPlaceholder() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { categories, loading } = useSelector(
    (state: RootState) => state.allCategories,
  )
  const  user  = useSelector((state: RootState) => state.user)
  const dispatch = useDispatch<AppDispatch>()
  useEffect(() => {
    dispatch(getallCategories())
  }, [dispatch])
  // Create mappings for name-to-ID conversions
  const categoryNameToId = categories.reduce((acc, category) => {
    acc[category.name] = category._id
    return acc
  }, {} as Record<string, string>)

  const subCategoryNameToId = categories.reduce((acc, category) => {
    category.subcategories.forEach(sub => {
      acc[sub.name] = sub._id
    })
    return acc
  }, {} as Record<string, string>)

  const form = useForm<DepartmentFormValues>({
    resolver: zodResolver(departmentSchema),
    defaultValues: {
      categories: [],
      subCategories: [],
    },
  })

  // Watch form values
  const selectedCategoryNames = form.watch('categories')

  // Get available subcategories based on selected categories
  const availableSubCategories =
    selectedCategoryNames.length > 0
      ? categories
          .filter(category => selectedCategoryNames.includes(category.name))
          .flatMap(category => category.subcategories.map(sub => sub.name))
      : []

  async function onSubmit(data: DepartmentFormValues) {
    setIsSubmitting(true)
    try {
      if (!user) throw new Error('User not authenticated')

      // Convert names to IDs before submission
      const categoryIds = data.categories.map(name => categoryNameToId[name])
      const subCategoryIds = data.subCategories.map(
        name => subCategoryNameToId[name],
      )

      const payload = {
        categories: categoryIds,
        subCategories: subCategoryIds,
        user_id: (user as any as User).user._id,
      }

      await dispatch(updateCategories(payload)).unwrap()
      // Optionally show success toast/message here
    } catch (error) {
      console.error('Error updating categories:', error)
      // Optionally show error toast/message here
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
        <div className='grid grid-cols-1 md:grid-cols-2 gap-6'>
          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium'>Category</label>
            <FormField
              control={form.control}
              name='categories'
              render={({ field }) => (
                <MultiSelect
                  options={categories.map(c => c.name)}
                  selected={field.value}
                  onChange={selected => {
                    field.onChange(selected)
                    // Reset subcategories when categories change
                    form.setValue('subCategories', [])
                  }}
                  placeholder='Select Category'
                />
              )}
            />
            <FormMessage>
              {form.formState.errors.categories?.message}
            </FormMessage>
          </div>

          <div className='flex flex-col gap-2'>
            <label className='text-sm font-medium'>Sub Category</label>
            <FormField
              control={form.control}
              name='subCategories'
              render={({ field }) => (
                <MultiSelect
                  options={availableSubCategories}
                  selected={field.value}
                  onChange={field.onChange}
                  placeholder={
                    selectedCategoryNames.length > 0
                      ? 'Select Sub Category'
                      : 'Select categories first'
                  }
                  disabled={selectedCategoryNames.length === 0}
                />
              )}
            />
            <FormMessage>
              {form.formState.errors.subCategories?.message}
            </FormMessage>
          </div>
        </div>

        <Button type='submit' disabled={isSubmitting}>
          {isSubmitting ? 'Submitting...' : 'Submit'}
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
