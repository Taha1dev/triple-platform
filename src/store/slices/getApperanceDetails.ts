import axiosClient from '@/api/apiClient'
import {
  AppearanceDetails,
  AppearanceState,
} from '@/models/api-schema/appearanceTypes'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'

const initialState: AppearanceState = {
  data: null,
  loading: false,
  error: null,
}

export const fetchAppearance = createAsyncThunk(
  'appearance/fetch',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axiosClient.get<{ data: AppearanceDetails }>(
        '/user-profile/apperance',
      )
      return response
    } catch (error) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data?.message || error.message)
      }
      return rejectWithValue('An unknown error occurred')
    }
  },
)

const appearanceSlice = createSlice({
  name: 'appearance',
  initialState,
  reducers: {
    clearAppearanceData(state) {
      state.data = null
      state.error = null
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchAppearance.pending, state => {
        state.loading = true
        state.error = null
      })
      .addCase(
        fetchAppearance.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false
          state.data = action.payload
        },
      )
      .addCase(fetchAppearance.rejected, (state, action) => {
        state.loading = false
        state.error = action.payload as string
      })
  },
})

export const { clearAppearanceData } = appearanceSlice.actions
export default appearanceSlice.reducer
