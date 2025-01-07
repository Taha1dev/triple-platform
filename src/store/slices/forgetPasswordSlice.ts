/* eslint-disable @typescript-eslint/no-explicit-any */
import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axiosClient from '@/api/apiClient';

interface forgetPasswordState {
  loading: boolean;
  error: string | null;
  success: boolean;
  email: string | null
}

const initialState: forgetPasswordState = {
  loading: false,
  error: null,
  success: false,
  email: null,
};

export const forgetPassword = createAsyncThunk(
  'auth/resendOtp',
  async (email: string | any, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/user/forgot-password', { email });
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || 'An error occurred');
    }
  }
);

const forgetPasswordSlice = createSlice({
  name: 'forgetPassword',
  initialState,
  reducers: {
    forgetPasswordState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.email = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(forgetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(forgetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.email = action.meta.arg; // Save email from the thunk's argument
      })
      .addCase(forgetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string;
      });
  }

});

export const { forgetPasswordState } = forgetPasswordSlice.actions;
export default forgetPasswordSlice.reducer;
