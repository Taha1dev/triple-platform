/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/api/apiClient";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { setUser } from "./userSlice";
import axios from "axios";

interface AuthState {
  loading: boolean;
  error: string | null;
  success: boolean;
}

const initialState: AuthState = {
  loading: false,
  error: null,
  success: false,
};

export const loginUser = createAsyncThunk<
  void,
  any,
  { rejectValue: string }
>(
  "auth/loginUser",
  async (userData, { rejectWithValue, dispatch }) => {
    try {
      const response = await axiosClient.post("/user/login", userData);
      console.log(response);
      const { token, ...user } = response as any;
      dispatch(setUser({ ...user, token }));
    } catch (error: any) {
      if (axios.isAxiosError(error)) {
        return rejectWithValue(error.response?.data || 'Login failed');
      }
    }
  }
);

const loginSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    resetAuthState: (state) => {
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
        state.error = action.payload || "Failed to login";
      });
  },
});

export const { resetAuthState } = loginSlice.actions;
export default loginSlice.reducer;
