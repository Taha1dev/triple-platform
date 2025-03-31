/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/api/apiClient'
// import { LoginResponseSchema } from '@/models/api-schema/auth.model'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
// import { setUser } from './userSlice'

interface UserProfile {
  loading: boolean
  error: string
  success: boolean
  user: any
}

const initialState: UserProfile = {
  loading: false,
  error: '',
  user: '',
  success: false,
}

export const updateProfilePic = createAsyncThunk(
  'user/update-profile-picture',
  async (formData: any, { rejectWithValue }) => {
    try {
      const response: any = await axiosClient.post(
        '/user-profile/update-profile-picture',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        },
      )
      console.log('response', response)
      // dispatch(setUser(response))
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

const updateProfilePicture = createSlice({
  name: 'updateProfile',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(updateProfilePic.pending, state => {
        state.loading = true
        state.error = ''
        state.success = false
      })
      .addCase(updateProfilePic.fulfilled, state => {
        state.loading = false
        state.success = true
      })
      .addCase(updateProfilePic.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || 'Failed to update profile'
        state.success = false
      })
  },
})

export default updateProfilePicture.reducer
