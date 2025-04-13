/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '@/api/apiClient';

interface ApperancePostState {
  loading: boolean;
  error: string | null;
  success: boolean;
  email: string | any
}

const initialState: ApperancePostState = {
  loading: false,
  error: null,
  success: false,
  email: ''
};

export const updateApperance = createAsyncThunk(
  'user/updateApperance',
  async (userData: Record<string, any>, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/user-profile/update-apperance', userData);
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data || 'An error occurred');
    }
  }
);


// Slice for registration state
const updateApperanceSlice = createSlice({
  name: 'updateApperance',
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
      .addCase(updateApperance.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(updateApperance.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateApperance.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to register';
      });
  },
});

export const { resetState } = updateApperanceSlice.actions;
export default updateApperanceSlice.reducer;

