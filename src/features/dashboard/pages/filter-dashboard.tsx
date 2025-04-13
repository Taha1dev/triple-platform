/* eslint-disable react-hooks/exhaustive-deps */
import { useState, useEffect } from 'react'
import { Filter, X } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card'

import { useDispatch, useSelector } from 'react-redux'
import { AppDispatch, RootState } from '@/store/store'
import FilterUserSkeletonCard from '../components/filter/filter-user-skeleton-card'
import { postUsers } from '@/store/slices/filterUserSlice'
import { fetchAppearance } from '@/store/slices/getApperanceDetails'
import FilterUserCard from '../components/filter/filter-user-card'
import { getallCategories } from '@/store/slices/getAllCategoriesSlice'

import { SkeletonDropdown } from '../components/controls/drop-down-skeleton'
import { MultiSelect } from '../components/controls/multi-select'

type FilterOptions = {
  category: string[]
  subCategory: string[]
  ethnicity: string[]
  hairColor: string[]
  hairTexture: string[]
  eyeColor: string[]
  skinTone: string[]
  facialFeatures: string[]
  tattoo: string[]
  piercing: string[]
  scars: string[]
}

export default function FilterDashboard() {
  const dispatch = useDispatch<AppDispatch>()
  const { appearance, loading: appearanceLoading } = useSelector(
    (state: RootState) => state.apperanceDetails,
  )
  const { users, loading } = useSelector((state: RootState) => state.filterUser)
  const { categories, loading: categoriesloading } = useSelector(
    (state: RootState) => state.allCategories,
  )

  const [filterOptions, setFilterOptions] = useState<FilterOptions>({
    category: [],
    subCategory: [],
    ethnicity: [],
    hairColor: [],
    hairTexture: [],
    eyeColor: [],
    skinTone: [],
    facialFeatures: [],
    tattoo: [],
    piercing: [],
    scars: [],
  })

  const [categoryFilter, setCategoryFilter] = useState<string[]>([])
  const [subCategoryFilter, setSubCategoryFilter] = useState<string[]>([])
  const [filteredSubCategories, setFilteredSubCategories] = useState<string[]>(
    [],
  )
  const [ethnicityFilter, setEthnicityFilter] = useState<string[]>([])
  const [hairColorFilter, setHairColorFilter] = useState<string[]>([])
  const [hairTextureFilter, setHairTextureFilter] = useState<string[]>([])
  const [eyeColorFilter, setEyeColorFilter] = useState<string[]>([])
  const [skinToneFilter, setSkinToneFilter] = useState<string[]>([])
  const [facialFeaturesFilter, setFacialFeaturesFilter] = useState<string[]>([])
  const [tattooFilter, setTattooFilter] = useState<string[]>([])
  const [piercingFilter, setPiercingFilter] = useState<string[]>([])
  const [scarsFilter, setScarsFilter] = useState<string[]>([])

  const categoryOptions = categories.map(c => c.name)
  const subCategoryMap = categories.reduce((acc, category) => {
    acc[category.name] = category.subcategories.map(sub => sub.name)
    return acc
  }, {} as Record<string, string[]>)

  useEffect(() => {
    const fetchData = async () => {
      try {
        await Promise.all([
          dispatch(getallCategories()).unwrap(),
          dispatch(fetchAppearance()).unwrap(),
          dispatch(postUsers({})).unwrap(),
        ])
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [dispatch])

  useEffect(() => {
    if (categoryFilter.length > 0) {
      const newSubCategories = categoryFilter.flatMap(
        cat => subCategoryMap[cat] || [],
      )
      setFilteredSubCategories(newSubCategories)
    } else {
      setFilteredSubCategories([])
    }
    setSubCategoryFilter([])
  }, [categoryFilter])
  
  useEffect(() => {
    if (appearance && appearance.length > 0) {
      const appearanceData = appearance[0]
      setFilterOptions({
        ...filterOptions,
        ethnicity: appearanceData.ethnicity,
        hairColor: appearanceData.hairColor,
        hairTexture: appearanceData.hairTexture,
        eyeColor: appearanceData.eyeColor,
        skinTone: appearanceData.skinTone,
        facialFeatures: appearanceData.facialFeatures,
        tattoo: appearanceData.tattoo,
        piercing: appearanceData.piercing,
        scars: appearanceData.scars,
      })
    }
  }, [appearance])

  const applyFilters = async () => {
    const filterData = {
      category: categoryFilter,
      subCategory: subCategoryFilter,
      ethnicity: ethnicityFilter,
      hairColor: hairColorFilter,
      hairTexture: hairTextureFilter,
      eyeColor: eyeColorFilter,
      skinTone: skinToneFilter,
      facialFeatures: facialFeaturesFilter,
      tattoo: tattooFilter,
      piercing: piercingFilter,
      scars: scarsFilter,
    }

    const filteredData = Object.fromEntries(
      Object.entries(filterData).filter(([_, value]) => {
        return Array.isArray(value) && value.length > 0
      }),
    )

    try {
      await dispatch(postUsers(filteredData)).unwrap()
    } catch (error) {
      console.error('Error applying filters:', error)
    }
  }

  const clearAllFilters = () => {
    setCategoryFilter([])
    setSubCategoryFilter([])
    setEthnicityFilter([])
    setHairColorFilter([])
    setHairTextureFilter([])
    setEyeColorFilter([])
    setSkinToneFilter([])
    setFacialFeaturesFilter([])
    setTattooFilter([])
    setPiercingFilter([])
    setScarsFilter([])
  }

  const hasActiveFilters = () => {
    return (
      categoryFilter.length > 0 ||
      subCategoryFilter.length > 0 ||
      ethnicityFilter.length > 0 ||
      hairColorFilter.length > 0 ||
      hairTextureFilter.length > 0 ||
      eyeColorFilter.length > 0 ||
      skinToneFilter.length > 0 ||
      facialFeaturesFilter.length > 0 ||
      tattooFilter.length > 0 ||
      piercingFilter.length > 0 ||
      scarsFilter.length > 0
    )
  }

  return (
    <div className='container mx-auto py-6'>
      <div className='flex flex-col gap-6'>
        <div className='flex items-center justify-between'>
          <h1 className='text-3xl font-bold'>Talent Dashboard</h1>
          <div className='flex items-center gap-2'>
            <Button
              variant='outline'
              size='sm'
              onClick={clearAllFilters}
              disabled={!hasActiveFilters()}
            >
              <X className='mr-2 h-4 w-4' />
              Clear Filters
            </Button>
          </div>
        </div>

        <Card className='p-4'>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>
              Filter talents by their attributes
            </CardDescription>
          </CardHeader>
          {appearanceLoading || categoriesloading ? (
            <div className='container mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-4'>
              {Array.from({ length: 12 }).map((_, i) => (
                <SkeletonDropdown key={i} />
              ))}
            </div>
          ) : (
            <CardContent className='pt-6'>
              <div className='container mx-auto grid grid-cols-1 lg:grid-cols-4 md:grid-cols-3 gap-4'>
                <div className='flex flex-col gap-2'>
                  <label className='text-sm font-medium'>Category</label>
                  <MultiSelect
                    options={categoryOptions}
                    selected={categoryFilter}
                    onChange={setCategoryFilter}
                    placeholder='Select Category'
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <label className='text-sm font-medium'>Sub Category</label>
                  <MultiSelect
                    options={filteredSubCategories}
                    selected={subCategoryFilter}
                    onChange={setSubCategoryFilter}
                    placeholder='Select Sub Category'
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <label className='text-sm font-medium'>Ethnicity</label>
                  <MultiSelect
                    options={filterOptions.ethnicity}
                    selected={ethnicityFilter}
                    onChange={setEthnicityFilter}
                    placeholder='Ethnicity'
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <label className='text-sm font-medium'>Hair Color</label>
                  <MultiSelect
                    options={filterOptions.hairColor}
                    selected={hairColorFilter}
                    onChange={setHairColorFilter}
                    placeholder='Hair Color'
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <label className='text-sm font-medium'>Hair Texture</label>
                  <MultiSelect
                    options={filterOptions.hairTexture}
                    selected={hairTextureFilter}
                    onChange={setHairTextureFilter}
                    placeholder='Hair Texture'
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <label className='text-sm font-medium'>Eye Color</label>
                  <MultiSelect
                    options={filterOptions.eyeColor}
                    selected={eyeColorFilter}
                    onChange={setEyeColorFilter}
                    placeholder='Eye Color'
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <label className='text-sm font-medium'>Skin Tone</label>
                  <MultiSelect
                    options={filterOptions.skinTone}
                    selected={skinToneFilter}
                    onChange={setSkinToneFilter}
                    placeholder='Skin Tone'
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <label className='text-sm font-medium'>Facial Features</label>
                  <MultiSelect
                    options={filterOptions.facialFeatures}
                    selected={facialFeaturesFilter}
                    onChange={setFacialFeaturesFilter}
                    placeholder='Facial Features'
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <label className='text-sm font-medium'>Tattoo</label>
                  <MultiSelect
                    options={filterOptions.tattoo}
                    selected={tattooFilter}
                    onChange={setTattooFilter}
                    placeholder='Tattoo'
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <label className='text-sm font-medium'>Piercing</label>
                  <MultiSelect
                    options={filterOptions.piercing}
                    selected={piercingFilter}
                    onChange={setPiercingFilter}
                    placeholder='Piercing'
                  />
                </div>

                <div className='flex flex-col gap-2'>
                  <label className='text-sm font-medium'>Scars</label>
                  <MultiSelect
                    options={filterOptions.scars}
                    selected={scarsFilter}
                    onChange={setScarsFilter}
                    placeholder='Scars'
                  />
                </div>
              </div>

              <div className='mt-4'>
                <Button onClick={applyFilters} className='w-fit'>
                  Apply Filters
                </Button>
              </div>
            </CardContent>
          )}
        </Card>

        <Card>
          <CardHeader className='flex flex-row items-center justify-between'>
            <div>
              <CardTitle>Talents</CardTitle>
              <CardDescription>
                Showing {users.length} of {users.length} talents
              </CardDescription>
            </div>
            <div className='flex items-center gap-2'>
              <Button variant='outline' size='sm'>
                <Filter className='mr-2 h-4 w-4' />
                View
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
              {loading
                ? Array.from({ length: 9 }).map((_, i) => (
                    <FilterUserSkeletonCard key={i} />
                  ))
                : users &&
                  users.map(user => (
                    <FilterUserCard key={user._id} user={user} />
                  ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
