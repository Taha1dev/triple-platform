import { SubCategory } from '@/models/api-schema/auth.model'
import { Category, Profile } from '@/models/api-schema/userType'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export interface UserData {
  _id: string
  fname: string
  lname: string
  email: string
  portfolio: ProfileImage[]
  password: string
  contact_number: string
  dob: string
  rating: number
  city: string[]
  categories: Category[]
  subCategories: SubCategory[]
  data: unknown[]
  profile: Profile
  OTP: string
  login_token: string
  country: string
  token?: string
}



export interface ProfileImage {
  url: string
  alt: string
  key: string
  mimetype: string
  description: string
}


export interface UserState {
  user: UserData | null
  token?: string
  loading: boolean
  initialized: boolean
}

const initialState: UserState = {
  user: null,
  token: undefined,
  loading: false,
  initialized: false,
}

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload
      state.token = action.payload.token
      // Store user data without token in 'user' key
      const { token, ...userData } = action.payload
      localStorage.setItem('user', JSON.stringify(userData))
      if (token) {
        localStorage.setItem('token', token)
      }
    },
    clearUser: state => {
      state.user = null
      state.token = undefined
      localStorage.removeItem('user')
      localStorage.removeItem('token')
    },
    initializeUserData: state => {
      state.loading = true
      const userString = localStorage.getItem('user')
      const token = localStorage.getItem('token')

      if (userString) {
        try {
          const user = JSON.parse(userString) as UserData
          state.user = {
            ...user,
            token: token || undefined // Add token to user object if it exists
          }
          state.token = token || undefined
        } catch (error) {
          console.error('Failed to parse user data:', error)
          state.user = null
          state.token = undefined
          localStorage.removeItem('user')
          localStorage.removeItem('token')
        }
      }
      state.loading = false
      state.initialized = true
    }
  },
})

export const { setUser, clearUser, initializeUserData } = userSlice.actions
export default userSlice.reducer