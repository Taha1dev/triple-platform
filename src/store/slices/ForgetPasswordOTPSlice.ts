/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/api/apiClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

interface ForgetPasswordOtpState {
  loading: boolean;
  error: string | null;
  success: boolean;
}
const initialState: ForgetPasswordOtpState = {
  loading: false,
  error: null,
  success: false,
};
export const ForgetPasswordOtp = createAsyncThunk(
  'auth/Otp',
  async ({ email, forgot_password_OTP }: any, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/user/verify-otp', { email, forgot_password_OTP });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || 'An error occurred');
    }
  }
);
export const ForgetPasswordOtpSlice = createSlice({
  name: 'forget-password-otp',
  initialState,
  reducers: {
    OTPState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(ForgetPasswordOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(ForgetPasswordOtp.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(ForgetPasswordOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  },
});
export const { OTPState } = ForgetPasswordOtpSlice.actions;
export default ForgetPasswordOtpSlice.reducer;