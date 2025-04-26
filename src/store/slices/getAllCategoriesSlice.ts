/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/api/apiClient'
import { Categories } from '@/models/api-schema/auth.model'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export type CategoriesResponse = Categories[]

export interface CategoriesState {
  categories: CategoriesResponse
  loading: boolean
  success: boolean
  error: string | null
}

const initialState: CategoriesState = {
  categories: [],
  loading: false,
  success: false,
  error: null,
}

export const getallCategories = createAsyncThunk<
  CategoriesResponse,
  void,
  { rejectValue: string }
>('user/getallCategories', async (_, { rejectWithValue }: any) => {
  try {
    const response = await axiosClient.get<CategoriesResponse>(
      'category/all-categories/',
    )
    return response
  } catch (error) {
    if (axios.isAxiosError(error)) {
      console.log('Axios error:', error.response?.data)
      return rejectWithValue(
        error.response?.data || 'Failed to fetch onboarding data',
      )
    }
    console.log('Unknown error:', error)
    return rejectWithValue('Unknown error')
  }
})

const allCategoriesSlice = createSlice({
  name: 'allCategories',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getallCategories.pending, state => {
        state.loading = true
        state.success = false
        state.error = null
      })
      .addCase(
        getallCategories.fulfilled,
        (state, action: PayloadAction<CategoriesResponse>) => {
          state.categories = action.payload
          state.loading = false
          state.success = true
        },
      )
      .addCase(getallCategories.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = action.payload as string
      })
  },
})

export default allCategoriesSlice.reducer
