/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/api/apiClient'
import { OnBoardingData } from '@/models/api-schema/auth.model'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

export type OnBoardingResponse = OnBoardingData[]

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

export const fetchOnBoarding = createAsyncThunk<
  OnBoardingResponse,
  void,
  { rejectValue: string }
>('user/fetchOnBoarding', async (_, { rejectWithValue }: any) => {
  try {
    const response = await axiosClient.get<OnBoardingResponse>(
      'onboarding/categories',
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

const onBoardingSlice = createSlice({
  name: 'onBoarding',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(fetchOnBoarding.pending, state => {
        state.loading = true
        state.success = false
        state.error = null
      })
      .addCase(
        fetchOnBoarding.fulfilled,
        (state, action: PayloadAction<OnBoardingResponse>) => {
          state.data = action.payload
          state.loading = false
          state.success = true
        },
      )
      .addCase(fetchOnBoarding.rejected, (state, action) => {
        state.loading = false
        state.success = false
        state.error = action.payload as string
      })
  },
})

export default onBoardingSlice.reducer
