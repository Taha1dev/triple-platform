/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/api/apiClient'
import { LoginResponseSchema } from '@/models/api-schema/auth.model'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface UserProfile extends Omit<LoginResponseSchema, 'token' | 'rating'> {
  loading: boolean
  error: string
  success: boolean
  user: any
}

const initialState: UserProfile = {
  id: '',
  image: '',
  fname: '',
  lname: '',
  contact_number: '',
  email: '',
  data: [],
  portfolio: [],
  city: [],
  country: '',
  dob: '',
  loading: false,
  error: '',
  success: false,
  user: null,
}

export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (formData: FormData, { rejectWithValue, }) => {
    console.log(formData);
    try {
      const response = await axiosClient.put('/user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      if (!response) throw new Error('Invalid response: user not found')
      // const token = localStorage.getItem('token')
      // dispatch(setUser({ ...response, token: response.login_token ?? undefined }))

      return response
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'An error occurred while updating the profile'
      )
    }
  }
)


const updateProfileSlice = createSlice({
  name: 'updateProfile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(updateProfile.pending, state => {
        state.loading = true
        state.error = ''
        state.success = false
      })
      .addCase(updateProfile.fulfilled, state => {
        state.loading = false
        state.success = true
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || 'Failed to update profile'
        state.success = false
      })
  },
})

export default updateProfileSlice.reducer
