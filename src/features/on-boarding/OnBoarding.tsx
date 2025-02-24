import { useEffect, useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'
// import { useNavigate } from 'react-router-dom'
import { AppDispatch, RootState } from '@/store/store'
import { getOnBoardingData } from '@/store/slices/getOnboardingDataSlice'
import { onBoardingCategory } from '@/models/api-schema/auth.model'
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import Spinner from '@/components/custom/Spinner'
import DotPattern from '@/components/ui/dot-pattern'
import { cn } from '@/lib/utils'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

type FormData = {
  category: string
  subCategory: string
}

export default function OnBoarding() {
  // const navigate = useNavigate()
  const dispatch = useDispatch<AppDispatch>()

  // State for categories and subcategories
  const [categories, setCategories] = useState<onBoardingCategory[]>([])
  const [subCategories, setSubCategories] = useState<
    onBoardingCategory['subcategories']
  >([])

  // Fetch categories data from Redux store
  const {
    loading,
    data: categoriesData,
  } = useSelector((state: RootState) => state.onBoardingCategories)

  const { control, handleSubmit } = useForm<FormData>()

  useEffect(() => {
    dispatch(getOnBoardingData())
  }, [dispatch])

  useEffect(() => {
    if (categoriesData && categoriesData.length > 0) {
      setCategories(categoriesData)
    }
  }, [categoriesData])

  const onSubmit = (data: FormData) => {
    console.log('Selected Category ID:', data.category)
    console.log('Selected Subcategory ID:', data.subCategory)

    const selectedCategory = categories.find(cat => cat._id === data.category)
    const selectedSubCategory = subCategories.find(
      subCat => subCat._id === data.subCategory,
    )

    if (selectedCategory) {
      console.log('Selected Category Name:', selectedCategory.name)
    }
    if (selectedSubCategory) {
      console.log('Selected Subcategory Name:', selectedSubCategory.name)
    }
  }

  const handleCategoryChange = (value: string) => {
    const selectedCategory = categories.find(cat => cat._id === value)
    if (selectedCategory) {
      setSubCategories(selectedCategory.subcategories)
    }
  }

  return (
    <>
      <DotPattern
        className={cn(
          '[mask-image:radial-gradient(1000px_circle_at_center,white,transparent)]',
          'inset-x-0 inset-y-[-50%] h-[150%]',
        )}
      />
      <main className='flex h-screen items-center justify-center'>
        <section className='w-full max-w-4xl mx-4 rounded-lg shadow-lg overflow-hidden z-20 bg-background'>
          <article className='lg:p-10 bg-background'>
            <Card className='w-full bg-transparent shadow-none'>
              <CardHeader className='space-y-2 text-center'>
                <CardTitle className='text-2xl font-bold'>
                  We need to get some information about you
                </CardTitle>
                <CardDescription className='text-sm text-zinc-600 dark:text-zinc-400'>
                  Let us know your preferences by selecting your Work Domains.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className='space-y-6 flex flex-col'
                >
                  <div className='w-full'>
                    <label className='block text-sm font-medium mb-2'>
                      Department
                    </label>
                    <Controller
                      name='category'
                      control={control}
                      render={({ field }) => (
                        <Select
                          onValueChange={(value: string) => {
                            field.onChange(value) // Update react-hook-form's state
                            handleCategoryChange(value) // Handle additional logic
                          }}
                          value={field.value}
                        >
                          <SelectTrigger className='w-full'>
                            <SelectValue placeholder='Select a Department' />
                          </SelectTrigger>
                          <SelectContent>
                            <SelectGroup>
                              <SelectLabel>Departments</SelectLabel>
                              {categories.map(item => (
                                <SelectItem key={item._id} value={item._id}>
                                  {item.name}
                                </SelectItem>
                              ))}
                            </SelectGroup>
                          </SelectContent>
                        </Select>
                      )}
                    />
                  </div>

                  {/* Subcategories dropdown (if needed) */}
                  {subCategories && subCategories.length > 0 && (
                    <div className='w-full'>
                      <label className='block text-sm font-medium mb-2'>
                        Subcategory
                      </label>
                      <Controller
                        name='subCategory'
                        control={control}
                        render={({ field }) => (
                          <Select
                            onValueChange={(value: string) => {
                              field.onChange(value) // Update react-hook-form's state
                            }}
                            value={field.value}
                          >
                            <SelectTrigger className='w-full'>
                              <SelectValue placeholder='Select a Subcategory' />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectGroup>
                                <SelectLabel>Subcategories</SelectLabel>
                                {subCategories.map(subCat => (
                                  <SelectItem
                                    key={subCat._id}
                                    value={subCat._id}
                                  >
                                    {subCat.name}
                                  </SelectItem>
                                ))}
                              </SelectGroup>
                            </SelectContent>
                          </Select>
                        )}
                      />
                    </div>
                  )}

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
