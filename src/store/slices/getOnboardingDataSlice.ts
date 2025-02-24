/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/api/apiClient'
import { onBoardingCategory } from '@/models/api-schema/auth.model'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export type OnBoardingResponse = onBoardingCategory[]

export interface OnBoardingState {
  data: OnBoardingResponse
  loading: boolean
  success: boolean
  error: string | null
}

const initialState: OnBoardingState = {
  data: [],
  loading: false,
  success: false,
  error: null,
}

export const getOnBoardingData = createAsyncThunk<
  OnBoardingResponse,
  void,
  { rejectValue: string }
>('user/getOnBoardingCategories', async (_, { rejectWithValue }: any) => {
  try {
    const response = await axiosClient.get<OnBoardingResponse>(
      'category/all-categories/',
    )
    console.log(response);
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

const onBoardingSlice = createSlice({
  name: 'getOnBoardingCategory',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(getOnBoardingData.pending, state => {
        state.loading = true
        state.success = false
        state.error = null
      })
      .addCase(
        getOnBoardingData.fulfilled,
        (state, action: PayloadAction<OnBoardingResponse>) => {
          state.data = action.payload
          state.loading = false
          state.success = true
        },
      )
      .addCase(getOnBoardingData.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = action.payload as string
      })
  },
})

export default onBoardingSlice.reducer
