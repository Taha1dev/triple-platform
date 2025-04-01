/* eslint-disable @typescript-eslint/no-explicit-any */
export interface LoginResponseSchema {
  id: string
  fname: string
  rating: number
  lname: string
  email: string
  data: any[]
  image: string
  portfolio: any[]
  city: string[]
  country: string
  contact_number: string
  dob: string
  token: string
}

export type OnBoardingResponse = OnBoardingData[]
export interface OnBoardingData {
  _id: string
  name: string
  icon: string
  data: any[]
  createdAt: string
  updatedAt: string
  __v: number | string
  categoryData: CategoryDaum[]
}

export interface CategoryDaum {
  _id: string
  name: string
  icon: string
  category: string
  data: any[]
  createdAt: string
  updatedAt: string
  __v: number | string
}
export interface Categories {
  subcategories: SubCategory[]
  _id: string
  name: string
  slug: string
  details: []
}
export interface SubCategory {
  _id: string
  type: string
  name: string
}
