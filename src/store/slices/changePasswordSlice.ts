/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/api/apiClient'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

// Define the interface for the payload
interface ChangePasswordPayload {
  _id: string | undefined
  password: string
}

// Define the state interface
interface ChangePasswordState {
  _id: string
  password: string
  success: boolean
  loading: boolean
  error: string | null
}

// Initial state
const initialState: ChangePasswordState = {
  _id: '',
  password: '',
  success: false,
  loading: false,
  error: null,
}

// Async thunk to change password
export const changePassword = createAsyncThunk<void, ChangePasswordPayload>(
  'user/changePassword',
  async (payload: ChangePasswordPayload, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('user/change-password', payload)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || 'An error occurred')
    }
  },
)

const changePasswordSlice = createSlice({
  name: 'change-password',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(changePassword.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(changePassword.fulfilled, state => {
        state.loading = false
        state.success = true
        state.error = null
      })
      .addCase(changePassword.rejected, (state, action: PayloadAction<any>) => {
        state.loading = false
        state.success = false
        state.error =
          action.payload || 'An error occurred while changing the password.'
      })
  },
})

export default changePasswordSlice.reducer
