/* eslint-disable @typescript-eslint/no-explicit-any */
// resendOtpSlice.ts
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '@/api/apiClient';

interface ResendOtpState {
  loading: boolean;
  error: string | null;
  success: boolean;
}


const initialState: ResendOtpState = {
  loading: false,
  error: null,
  success: false,
};


export const resendOtp = createAsyncThunk(
  'auth/resendOtp',
  async (email: string | any, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/user/resendotp', { userId: email });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || 'An error occurred');
    }
  }
);


const resendOtpSlice = createSlice({
  name: 'resendOtp',
  initialState,
  reducers: {
    resetOtpState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resendOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(resendOtp.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resendOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});


export const { resetOtpState } = resendOtpSlice.actions;
export default resendOtpSlice.reducer;
