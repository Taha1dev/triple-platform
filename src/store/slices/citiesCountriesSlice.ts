/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/api/apiClient'
import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'

interface DashboardState {
  selectedCountry: string
  selectedCities: string[]
  loading: boolean
  error: string | null
  success: boolean
}

const initialState: DashboardState = {
  selectedCountry: '',
  selectedCities: [],
  loading: false,
  error: null,
  success: false,
}
export const userBase = createAsyncThunk(
  'auth/user',
  async (payload: Record<string, any>, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/user', payload)
      return response.data
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || 'An error occurred')
    }
  },
)
const dashboardSlice = createSlice({
  name: 'dashboard',
  initialState,
  reducers: {
    setSelectedCountry(state, action: PayloadAction<string>) {
      state.selectedCountry = action.payload
    },
    setSelectedCities(state, action: PayloadAction<string[]>) {
      state.selectedCities = action.payload
    },
  },
  extraReducers(builder) {
    builder
      .addCase(userBase.pending, state => {
        state.loading = true
        state.error = null
        state.success = false
      })
      .addCase(userBase.fulfilled, state => {
        state.loading = false
        state.success = true
      })
      .addCase(userBase.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || 'Failed to register'
      })
  },
})

export const { setSelectedCountry, setSelectedCities } = dashboardSlice.actions
export default dashboardSlice.reducer
