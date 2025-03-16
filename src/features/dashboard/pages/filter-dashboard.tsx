"use client"

import { useState, useEffect } from "react"
import { Check, ChevronsUpDown, Filter, X } from "lucide-react"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem, CommandList } from "@/components/ui/command"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Separator } from "@/components/ui/separator"
import { cn } from "@/lib/utils"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { ScrollArea } from "@/components/ui/scroll-area"

type User = {
  id: number
  name: string
  email: string
  avatar: string
  category: string
  subCategory: string
  ethnicity: string
  hairColor: string
  hairTexture: string
  eyeColor: string
  skinTone: string
  facialFeatures: string[]
  tattoo: boolean
  piercing: boolean
  scars: boolean
}

const filterOptions = {
  category: ["Model", "Actor", "Musician", "Dancer", "Extra"],
  subCategory: [
    "Commercial",
    "Editorial",
    "Runway",
    "Film",
    "TV",
    "Theater",
    "Vocalist",
    "Instrumentalist",
    "Ballet",
    "Contemporary",
    "Background",
  ],
  ethnicity: [
    "Asian",
    "Black",
    "Caucasian",
    "Hispanic",
    "Middle Eastern",
    "Mixed",
    "Native American",
    "Pacific Islander",
  ],
  hairColor: ["Black", "Brown", "Blonde", "Red", "Gray", "White", "Colorful"],
  hairTexture: ["Straight", "Wavy", "Curly", "Coily", "Bald"],
  eyeColor: ["Brown", "Blue", "Green", "Hazel", "Gray", "Amber"],
  skinTone: ["Very Fair", "Fair", "Medium", "Olive", "Brown", "Dark Brown", "Deep Dark Brown"],
  facialFeatures: ["Freckles", "Dimples", "High Cheekbones", "Strong Jawline", "Full Lips", "Defined Brows"],
}

const generateDummyUsers = (count: number): User[] => {
  const users: User[] = []

  for (let i = 1; i <= count; i++) {
    const randomCategory = filterOptions.category[Math.floor(Math.random() * filterOptions.category.length)]
    const randomSubCategory = filterOptions.subCategory[Math.floor(Math.random() * filterOptions.subCategory.length)]
    const randomEthnicity = filterOptions.ethnicity[Math.floor(Math.random() * filterOptions.ethnicity.length)]
    const randomHairColor = filterOptions.hairColor[Math.floor(Math.random() * filterOptions.hairColor.length)]
    const randomHairTexture = filterOptions.hairTexture[Math.floor(Math.random() * filterOptions.hairTexture.length)]
    const randomEyeColor = filterOptions.eyeColor[Math.floor(Math.random() * filterOptions.eyeColor.length)]
    const randomSkinTone = filterOptions.skinTone[Math.floor(Math.random() * filterOptions.skinTone.length)]

    // Generate 1-3 random facial features
    const randomFacialFeatures: string[] = []
    const featureCount = Math.floor(Math.random() * 3) + 1
    const shuffledFeatures = [...filterOptions.facialFeatures].sort(() => 0.5 - Math.random())
    for (let j = 0; j < featureCount; j++) {
      randomFacialFeatures.push(shuffledFeatures[j])
    }

    users.push({
      id: i,
      name: `User ${i}`,
      email: `user${i}@example.com`,
      avatar: `/placeholder.svg?height=40&width=40`,
      category: randomCategory,
      subCategory: randomSubCategory,
      ethnicity: randomEthnicity,
      hairColor: randomHairColor,
      hairTexture: randomHairTexture,
      eyeColor: randomEyeColor,
      skinTone: randomSkinTone,
      facialFeatures: randomFacialFeatures,
      tattoo: Math.random() > 0.7,
      piercing: Math.random() > 0.6,
      scars: Math.random() > 0.8,
    })
  }

  return users
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

type BooleanFilterProps = {
  label: string
  value: boolean | null
  onChange: (value: boolean | null) => void
}

function BooleanFilter({ label, value, onChange }: BooleanFilterProps) {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Button variant="outline" className="min-w-[120px] justify-between h-auto min-h-10">
          {value === null ? (
            <span className="text-muted-foreground">{label}</span>
          ) : (
            <Badge variant="secondary" className="rounded-sm">
              {value ? "Yes" : "No"}
            </Badge>
          )}
          <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[120px] p-0">
        <Command>
          <CommandList>
            <CommandGroup>
              <CommandItem onSelect={() => onChange(true)}>
                <Check className={cn("mr-2 h-4 w-4", value === true ? "opacity-100" : "opacity-0")} />
                Yes
              </CommandItem>
              <CommandItem onSelect={() => onChange(false)}>
                <Check className={cn("mr-2 h-4 w-4", value === false ? "opacity-100" : "opacity-0")} />
                No
              </CommandItem>
              <CommandItem onSelect={() => onChange(null)}>
                <Check className={cn("mr-2 h-4 w-4", value === null ? "opacity-100" : "opacity-0")} />
                Any
              </CommandItem>
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}

export default function FilterDashboard() {
  const [users, setUsers] = useState<User[]>([])
  const [filteredUsers, setFilteredUsers] = useState<User[]>([])

  const [categoryFilter, setCategoryFilter] = useState<string[]>([])
  const [subCategoryFilter, setSubCategoryFilter] = useState<string[]>([])
  const [ethnicityFilter, setEthnicityFilter] = useState<string[]>([])
  const [hairColorFilter, setHairColorFilter] = useState<string[]>([])
  const [hairTextureFilter, setHairTextureFilter] = useState<string[]>([])
  const [eyeColorFilter, setEyeColorFilter] = useState<string[]>([])
  const [skinToneFilter, setSkinToneFilter] = useState<string[]>([])
  const [facialFeaturesFilter, setFacialFeaturesFilter] = useState<string[]>([])
  const [tattooFilter, setTattooFilter] = useState<boolean | null>(null)
  const [piercingFilter, setPiercingFilter] = useState<boolean | null>(null)
  const [scarsFilter, setScarsFilter] = useState<boolean | null>(null)

  // Generate dummy data on component mount
  useEffect(() => {
    const dummyUsers = generateDummyUsers(20)
    setUsers(dummyUsers)
    setFilteredUsers(dummyUsers)
  }, [])

  // Apply filters when any filter changes
  useEffect(() => {
    let result = [...users]

    // Apply category filter
    if (categoryFilter.length > 0) {
      result = result.filter((user) => categoryFilter.includes(user.category))
    }

    // Apply subCategory filter
    if (subCategoryFilter.length > 0) {
      result = result.filter((user) => subCategoryFilter.includes(user.subCategory))
    }

    // Apply ethnicity filter
    if (ethnicityFilter.length > 0) {
      result = result.filter((user) => ethnicityFilter.includes(user.ethnicity))
    }

    // Apply hairColor filter
    if (hairColorFilter.length > 0) {
      result = result.filter((user) => hairColorFilter.includes(user.hairColor))
    }

    // Apply hairTexture filter
    if (hairTextureFilter.length > 0) {
      result = result.filter((user) => hairTextureFilter.includes(user.hairTexture))
    }

    // Apply eyeColor filter
    if (eyeColorFilter.length > 0) {
      result = result.filter((user) => eyeColorFilter.includes(user.eyeColor))
    }

    // Apply skinTone filter
    if (skinToneFilter.length > 0) {
      result = result.filter((user) => skinToneFilter.includes(user.skinTone))
    }

    // Apply facialFeatures filter
    if (facialFeaturesFilter.length > 0) {
      result = result.filter((user) => facialFeaturesFilter.some((feature) => user.facialFeatures.includes(feature)))
    }

    // Apply tattoo filter
    if (tattooFilter !== null) {
      result = result.filter((user) => user.tattoo === tattooFilter)
    }

    // Apply piercing filter
    if (piercingFilter !== null) {
      result = result.filter((user) => user.piercing === piercingFilter)
    }

    // Apply scars filter
    if (scarsFilter !== null) {
      result = result.filter((user) => user.scars === scarsFilter)
    }

    setFilteredUsers(result)
  }, [
    users,
    categoryFilter,
    subCategoryFilter,
    ethnicityFilter,
    hairColorFilter,
    hairTextureFilter,
    eyeColorFilter,
    skinToneFilter,
    facialFeaturesFilter,
    tattooFilter,
    piercingFilter,
    scarsFilter,
  ])

  // Clear all filters
  const clearAllFilters = () => {
    setCategoryFilter([])
    setSubCategoryFilter([])
    setEthnicityFilter([])
    setHairColorFilter([])
    setHairTextureFilter([])
    setEyeColorFilter([])
    setSkinToneFilter([])
    setFacialFeaturesFilter([])
    setTattooFilter(null)
    setPiercingFilter(null)
    setScarsFilter(null)
  }

  // Check if any filters are applied
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
          <CardContent>
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
                <BooleanFilter label="Tattoo" value={tattooFilter} onChange={setTattooFilter} />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Piercing</label>
                <BooleanFilter label="Piercing" value={piercingFilter} onChange={setPiercingFilter} />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">Scars</label>
                <BooleanFilter label="Scars" value={scarsFilter} onChange={setScarsFilter} />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Talents</CardTitle>
              <CardDescription>
                Showing {filteredUsers.length} of {users.length} talents
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
              {filteredUsers.map((user) => (
                <Card key={user.id} className="overflow-hidden">
                  <CardContent className="p-0">
                    <div className="flex items-start p-4">
                      <Avatar className="h-10 w-10 mr-4">
                        <AvatarImage src={user.avatar} alt={user.name} />
                        <AvatarFallback>{user.name.substring(0, 2)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <h3 className="font-medium">{user.name}</h3>
                        <p className="text-sm text-muted-foreground">
                          {user.category} / {user.subCategory}
                        </p>
                      </div>
                    </div>
                    <Separator />
                    <div className="p-4 grid grid-cols-2 gap-2 text-sm">
                      <div>
                        <span className="font-medium">Ethnicity:</span> {user.ethnicity}
                      </div>
                      <div>
                        <span className="font-medium">Hair:</span> {user.hairColor}, {user.hairTexture}
                      </div>
                      <div>
                        <span className="font-medium">Eyes:</span> {user.eyeColor}
                      </div>
                      <div>
                        <span className="font-medium">Skin:</span> {user.skinTone}
                      </div>
                      <div className="col-span-2">
                        <span className="font-medium">Features:</span> {user.facialFeatures.join(", ")}
                      </div>
                      <div className="col-span-2 flex gap-2 mt-2">
                        {user.tattoo && <Badge variant="outline">Tattoo</Badge>}
                        {user.piercing && <Badge variant="outline">Piercing</Badge>}
                        {user.scars && <Badge variant="outline">Scars</Badge>}
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

