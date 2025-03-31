export interface ApiResponse {
  status: number
  data: { data: FilterUser[] }
  message: string
}

export interface FilterUser {
  _id: string
  fname: string
  lname: string
  email: string
  portfolio: any[]
  contact_number: string
  dob: string
  rating: number
  city: string[]
  categories: Category[]
  subCategories: SubCategory[]
  data: any[]
  profile: Profile
}

export interface Category {
  _id: string
  name: string
  icon: string
  slug: string
}

export interface SubCategory {
  _id: string
  type: string
  name?: string
  locationType?: string
  location?: string
}

export interface Profile {
  _id: string
  ethnicity?: string
  hairColor?: string
  hairTexture?: string
  eyeColor?: string
  skinTone?: string
  facialFeatures: string[]
  tattoo: string[]
  piercing: string[]
  scars: string[]
  user: string
  portfolioMedia: any[]
  languagesSpoken: any[]
}
export interface UserState {
  users: FilterUser[]
  loading: boolean
  error: string | null
  status: number | null
}
