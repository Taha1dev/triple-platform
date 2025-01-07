/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/api/apiClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface VerifyOtpState {
  loading: boolean;
  error: string | null;
  success: boolean;
}
const initialState: VerifyOtpState = {
  loading: false,
  error: null,
  success: false,
};
export const verifyOtp = createAsyncThunk(
  'auth/verifyOtp',
  async ({ email, forgot_password_OTP }: any, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/user/verify-otp', { email, forgot_password_OTP });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || 'An error occurred');
    }
  }
);
const VerifyOtpSlice = createSlice({
  name: 'verify-otp',
  initialState,
  reducers: {
    verifyOTPState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(verifyOtp.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(verifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { verifyOTPState } = VerifyOtpSlice.actions;
export default VerifyOtpSlice.reducer;