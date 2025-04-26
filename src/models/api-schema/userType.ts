/* eslint-disable @typescript-eslint/no-explicit-any */
import { ProfileImage} from "@/store/slices/userSlice"

export interface ApiResponse {
  status: number
  data: any
  message: string
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
  profileImage: ProfileImage
  facialFeatures: string[]
  tattoo: string[]
  piercing: string[]
  scars: string[]
  user: string
  portfolioMedia: unknown[]
  languagesSpoken: unknown[]
}
export interface UserState {
  users: any
  loading: boolean
  error: string | null
  status: number | null
}
