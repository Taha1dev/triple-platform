/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from '@/api/apiClient'
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'

interface UploadPortfolioState {
  loading: boolean
  error: string
  success: boolean
}

const initialState: UploadPortfolioState = {
  loading: false,
  error: '',
  success: false,
}

export const uploadPortfolioPicture = createAsyncThunk(
  'portfolio/upload-picture',
  async (
    formData: FormData, 
    { rejectWithValue }
  ) => {
    try {
      const response = await axiosClient.post(
        '/upload-portfolio-picture',
        formData,
        {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        }
      )

      return response.data
    } catch (error: any) {
      return rejectWithValue(
        error.response?.data?.message || 'Failed to upload portfolio picture'
      )
    }
  }
)

const uploadPortfolioSlice = createSlice({
  name: 'uploadPortfolio',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      .addCase(uploadPortfolioPicture.pending, state => {
        state.loading = true
        state.error = ''
        state.success = false
      })
      .addCase(uploadPortfolioPicture.fulfilled, state => {
        state.loading = false
        state.success = true
      })
      .addCase(uploadPortfolioPicture.rejected, (state, action) => {
        state.loading = false
        state.error = (action.payload as string) || 'Upload failed'
        state.success = false
      })
  },
})

export default uploadPortfolioSlice.reducer
