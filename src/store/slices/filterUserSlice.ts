/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/api/apiClient'
import { UserState, ApiResponse } from '@/models/api-schema/userType'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

const initialState: UserState = {
  users: [],
  loading: false,
  error: null,
  status: null,
}

export const postUsers = createAsyncThunk(
  'users/postUsers',
  async (filterData: any, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post<ApiResponse>(
        '/filter',
        filterData,
      )

      return response
    } catch (error: any) {
      return rejectWithValue({
        status: error.response?.status,
        message: error.response?.data?.message || error.message,
      })
    }
  },
)

export const filterUsersSlice = createSlice({
  name: 'filterUsers',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(postUsers.pending, state => {
        state.loading = true
        state.error = null
        state.status = null
      })
      .addCase(postUsers.fulfilled, (state, action: any) => {
        state.loading = false
        state.users = action.payload || []
        state.status = action.payload.status
      })
      .addCase(postUsers.rejected, (state, action: any) => {
        state.loading = false
        state.error = action.payload?.message || 'Failed to fetch users'
        state.status = action.payload?.status || 500
        state.users = []
      })
  },
})

export default filterUsersSlice.reducer
