import { useState, useEffect } from "react"
import { Check, ChevronsUpDown, Filter, X } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { cn } from "@/lib/utils"
import { ScrollArea } from "@/components/ui/scroll-area"
import { useDispatch, useSelector } from "react-redux"
import { AppDispatch, RootState } from "@/store/store"
import FilterUserSkeletonCard from "../components/filter/filter-user-skeleton-card"
import { postUsers } from "@/store/slices/filterUserSlice"
import { fetchAppearance } from "@/store/slices/getApperanceDetails"
import FilterUserCard from "../components/filter/filter-user-card"

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

type MultiSelectProps = {
  options: string[]
  selected: string[]
  onChange: (selected: string[]) => void
  placeholder: string
}

function MultiSelect({ options, selected, onChange, placeholder }: MultiSelectProps) {
  const [open, setOpen] = useState(false)
  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="min-w-[200px] justify-between h-auto min-h-10"
        >
          {selected.length > 0 ? (
            <div className="flex flex-wrap gap-1">
              {selected.length > 2 ? (
                <Badge variant="secondary" className="rounded-sm">
                  {selected.length} selected
                </Badge>
              ) : (
                selected.map((item) => (
                  <Badge key={item} variant="secondary" className="rounded-sm">
                    {item}
                  </Badge>
                ))
              )}
            </div>
          ) : (
            <span className="text-muted-foreground">{placeholder}</span>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[200px] p-0">
        <Command>
          <CommandInput placeholder={`Search ${placeholder.toLowerCase()}...`} />
          <CommandList>
            <CommandEmpty>No {placeholder.toLowerCase()} found.</CommandEmpty>
            <CommandGroup>
              <ScrollArea className="h-[200px]">
                {options.map((option) => (
                  <CommandItem
                    key={option}
                    value={option}
                    onSelect={() => {
                      onChange(
                        selected.includes(option) ? selected.filter((item) => item !== option) : [...selected, option],
                      )
                    }}
                  >
                    <Check className={cn("mr-2 h-4 w-4", selected.includes(option) ? "opacity-100" : "opacity-0")} />
                    {option}
                  </CommandItem>
                ))}
              </ScrollArea>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default function FilterDashboard() {
  const dispatch = useDispatch<AppDispatch>()
  const { data: appearance } = useSelector((state: RootState) => state.apperanceDetails)
  const { users: filterUsers, loading } = useSelector((state: RootState) => state.filterUser)

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
    scars: []
  })


  const [categoryFilter, setCategoryFilter] = useState<string[]>([])
  const [subCategoryFilter, setSubCategoryFilter] = useState<string[]>([])
  const [ethnicityFilter, setEthnicityFilter] = useState<string[]>([])
  const [hairColorFilter, setHairColorFilter] = useState<string[]>([])
  const [hairTextureFilter, setHairTextureFilter] = useState<string[]>([])
  const [eyeColorFilter, setEyeColorFilter] = useState<string[]>([])
  const [skinToneFilter, setSkinToneFilter] = useState<string[]>([])
  const [facialFeaturesFilter, setFacialFeaturesFilter] = useState<string[]>([])
  const [tattooFilter, setTattooFilter] = useState<string[]>([])
  const [piercingFilter, setPiercingFilter] = useState<string[]>([])
  const [scarsFilter, setScarsFilter] = useState<string[]>([])


  useEffect(() => {
    const fetchData = async () => {
      try {
        await dispatch(postUsers({})).unwrap()
        await dispatch(fetchAppearance()).unwrap()
      } catch (error) {
        console.error('Error fetching data:', error)
      }
    }
    fetchData()
  }, [dispatch])


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
        scars: appearanceData.scars
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
      scars: scarsFilter
    }

    try {
      await dispatch(postUsers(filterData)).unwrap()
    } catch (error) {
      console.error('Error applying filters:', error)
    }
  }

  // useEffect(() => {
  //   let result = [...users]

  //   if (categoryFilter.length > 0) {
  //     result = result.filter((user) => categoryFilter.includes(user.category))
  //   }

  //   if (subCategoryFilter.length > 0) {
  //     result = result.filter((user) => subCategoryFilter.includes(user.subCategory))
  //   }

  //   if (ethnicityFilter.length > 0) {
  //     result = result.filter((user) => ethnicityFilter.includes(user.ethnicity))
  //   }

  //   if (hairColorFilter.length > 0) {
  //     result = result.filter((user) => hairColorFilter.includes(user.hairColor))
  //   }

  //   if (hairTextureFilter.length > 0) {
  //     result = result.filter((user) => hairTextureFilter.includes(user.hairTexture))
  //   }

  //   if (eyeColorFilter.length > 0) {
  //     result = result.filter((user) => eyeColorFilter.includes(user.eyeColor))
  //   }
  //   if (skinToneFilter.length > 0) {
  //     result = result.filter((user) => skinToneFilter.includes(user.skinTone))
  //   }

  //   if (facialFeaturesFilter.length > 0) {
  //     result = result.filter((user) => facialFeaturesFilter.some((feature) => user.facialFeatures.includes(feature)))
  //   }

  //   // if (tattooFilter !== null) {
  //   //   result = result.filter((user) => user.tattoo === tattooFilter)
  //   // }

  //   // if (piercingFilter !== null) {
  //   //   result = result.filter((user) => user.piercing === piercingFilter)
  //   // }

  //   // if (scarsFilter !== null) {
  //   //   result = result.filter((user) => user.scars === scarsFilter)
  //   // }

  //   setFilteredUsers(result)
  // }, [
  //   users,
  //   categoryFilter,
  //   subCategoryFilter,
  //   ethnicityFilter,
  //   hairColorFilter,
  //   hairTextureFilter,
  //   eyeColorFilter,
  //   skinToneFilter,
  //   facialFeaturesFilter,
  //   tattooFilter,
  //   piercingFilter,
  //   scarsFilter,
  // ])

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
      tattooFilter !== null ||
      piercingFilter !== null ||
      scarsFilter !== null
    )
  }

  return (
    <div className="container mx-auto py-6">
      <div className="flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Talent Dashboard</h1>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="sm" onClick={clearAllFilters} disabled={!hasActiveFilters()}>
              <X className="mr-2 h-4 w-4" />
              Clear Filters
            </Button>
          </div>
        </div>

        <Card>
          <CardHeader>
            <CardTitle>Filters</CardTitle>
            <CardDescription>Filter talents by their attributes</CardDescription>
          </CardHeader>
          <CardContent className="pt-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Category</label>
                <MultiSelect
                  options={filterOptions.category}
                  selected={categoryFilter}
                  onChange={setCategoryFilter}
                  placeholder="Category"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Sub Category</label>
                <MultiSelect
                  options={filterOptions.subCategory}
                  selected={subCategoryFilter}
                  onChange={setSubCategoryFilter}
                  placeholder="Sub Category"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Ethnicity</label>
                <MultiSelect
                  options={filterOptions.ethnicity}
                  selected={ethnicityFilter}
                  onChange={setEthnicityFilter}
                  placeholder="Ethnicity"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Hair Color</label>
                <MultiSelect
                  options={filterOptions.hairColor}
                  selected={hairColorFilter}
                  onChange={setHairColorFilter}
                  placeholder="Hair Color"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Hair Texture</label>
                <MultiSelect
                  options={filterOptions.hairTexture}
                  selected={hairTextureFilter}
                  onChange={setHairTextureFilter}
                  placeholder="Hair Texture"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Eye Color</label>
                <MultiSelect
                  options={filterOptions.eyeColor}
                  selected={eyeColorFilter}
                  onChange={setEyeColorFilter}
                  placeholder="Eye Color"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Skin Tone</label>
                <MultiSelect
                  options={filterOptions.skinTone}
                  selected={skinToneFilter}
                  onChange={setSkinToneFilter}
                  placeholder="Skin Tone"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Facial Features</label>
                <MultiSelect
                  options={filterOptions.facialFeatures}
                  selected={facialFeaturesFilter}
                  onChange={setFacialFeaturesFilter}
                  placeholder="Facial Features"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Tattoo</label>
                <MultiSelect
                  options={filterOptions.tattoo}
                  selected={tattooFilter}
                  onChange={setTattooFilter}
                  placeholder="Tattoo"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Piercing</label>
                <MultiSelect
                  options={filterOptions.piercing}
                  selected={piercingFilter}
                  onChange={setPiercingFilter}
                  placeholder="Piercing"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Scars</label>
                <MultiSelect
                  options={filterOptions.scars}
                  selected={scarsFilter}
                  onChange={setScarsFilter}
                  placeholder="Scars"
                />
              </div>
            </div>

            <div className="mt-4">
              <Button onClick={applyFilters} className="w-full">
                Apply Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Talents</CardTitle>
              <CardDescription>
                Showing {filterUsers.length} of {filterUsers.length} talents
              </CardDescription>
            </div>
            <div className="flex items-center gap-2">
              <Button variant="outline" size="sm">
                <Filter className="mr-2 h-4 w-4" />
                View
              </Button>
            </div>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {loading ? (
                Array.from({ length: 9 }).map((_, i) => <FilterUserSkeletonCard key={i} />)
              ) : filterUsers && filterUsers.map((user) => (
                <FilterUserCard key={user._id} user={user} />
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

