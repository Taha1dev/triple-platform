/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '@/api/apiClient';

interface ResetPasswordState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ResetPasswordState = {
  loading: false,
  error: null,
  success: false,
};

export const resetPassword = createAsyncThunk(
  'auth/resetPassword',
  async (userData: Record<string, any>, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/user/reset-password', userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || 'An error occurred');
    }
  }
);



const resetPasswordSlice = createSlice({
  name: 'reset-password',
  initialState,
  reducers: {
    resetPasswordState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(resetPassword.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to register';
      });
  },
});

export const { resetPasswordState: resetState } = resetPasswordSlice.actions;
export default resetPasswordSlice.reducer;

