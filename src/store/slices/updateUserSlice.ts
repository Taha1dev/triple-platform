/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/api/apiClient'
import { LoginResponseSchema } from '@/models/api-schema/auth.model'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { setUser } from './userSlice'

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
  async (formData: any, { rejectWithValue, dispatch }) => {
    try {
      const response: any = await axiosClient.post('/user-profile/update-apperance', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      })
      console.log('response', response)
      dispatch(setUser(response))
      // const state: any = getState();
      // const existingUserData = state.user.user;

      // // Update the local user state with formData
      // const updatedData = { ...existingUserData, ...Object.fromEntries(formData.entries()) };

      // dispatch(setUser(updatedData));
      // return updatedData;

      return
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message ||
          'An error occurred while updating the profile',
      )
    }
  },
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
