/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '@/api/apiClient';

interface ApperancePostState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: ApperancePostState = {
  loading: false,
  error: null,
  success: false,
};

export const updateCategories = createAsyncThunk(
  'user/updateCategories',
  async (userData: Record<string, any>, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/user-profile/update-category', userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || 'An error occurred');
    }
  }
);


// Slice for registration state
const updateCategoriesSlice = createSlice({
  name: 'updateCategories',
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
      .addCase(updateCategories.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateCategories.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateCategories.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to register';
      });
  },
});

export const { resetState } = updateCategoriesSlice.actions;
export default updateCategoriesSlice.reducer;

