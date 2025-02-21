/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/api/apiClient'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface LogoutState {
  success: boolean
  error: string | null
  loading: boolean
}
const initialState: LogoutState = {
  success: false,
  error: '',
  loading: false,
}
export const logoutUser = createAsyncThunk(
  'user/logout',
  async (_id: string, { rejectWithValue }) => {
    try {
      await axiosClient.post('/user/logout', { _id })
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || 'An error occurred')
    }
  },
)

const logoutSlice = createSlice({
  name: 'logout',
  initialState: initialState,
  reducers: {
    logoutState: state => {
      state.loading = false
      state.error = null
      state.success = false
    },
  },
  extraReducers: builder => {
    builder
      .addCase(logoutUser.pending, state => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(logoutUser.fulfilled, state => {
        state.loading = false
        state.success = true
        localStorage.setItem('user', '')
        localStorage.setItem('token', '')
      })
      .addCase(logoutUser.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || 'Failed to logout'
      })
  },
})
export const { logoutState } = logoutSlice.actions
export default logoutSlice.reducer
