/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/api/apiClient";
import { LoginResponseSchema } from "@/models/api-schema/auth.model";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setUser } from "./userSlice";

interface UserProfile extends Omit<LoginResponseSchema, 'token' | 'rating'> {
  loading: boolean;
  error: string;
  success: boolean;
  user: any;
}

const initialState: UserProfile = {
  id: '',
  image: '',
  fname: '',
  lname: '',
  contact_number: '',
  email: '',
  data: [],
  portfolio: [],
  city: [],
  country: '',
  dob: '',
  loading: false,
  error: '',
  success: false,
  user: null,
};


export const updateProfile = createAsyncThunk(
  'user/updateProfile',
  async (formData: any, { rejectWithValue, dispatch, getState }) => {
    try {
      await axiosClient.put('/user', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      const state: any = getState();
      const userId = state.user.user.id;
      const { data } = await axiosClient.get(`/user/${userId}`);
      console.log(data);
      dispatch(setUser(data));
      // const state: any = getState();
      // const existingUserData = state.user.user;

      // // Update the local user state with formData
      // const updatedData = { ...existingUserData, ...Object.fromEntries(formData.entries()) };

      // dispatch(setUser(updatedData));
      // return updatedData;

      return;
    } catch (error: any) {
      return rejectWithValue(error.response?.data?.message || 'An error occurred while updating the profile');
    }
  }
);

const updateProfileSlice = createSlice({
  name: 'updateProfile',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateProfile.pending, (state) => {
        state.loading = true;
        state.error = '';
        state.success = false;
      })
      .addCase(updateProfile.fulfilled, (state) => {
        state.loading = false;
        state.success = true;
      })
      .addCase(updateProfile.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to update profile';
        state.success = false;
      });
  },
});

export default updateProfileSlice.reducer;