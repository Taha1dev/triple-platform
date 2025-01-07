/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/api/apiClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
interface RegisterState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: RegisterState = {
  loading: false,
  error: null,
  success: false,
};
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (userData: Record<string, any>, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/user/login', userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || 'An error occurred');
    }
  }
);
const loginSlice = createSlice({
  name: 'login',
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to register';
      });
  },
});

export const { resetState } = loginSlice.actions;
export default loginSlice.reducer;