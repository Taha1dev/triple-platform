/* eslint-disable @typescript-eslint/no-explicit-any */
import axiosClient from "@/api/apiClient";
import { LoginResponseSchema } from "@/models/api-schema/auth.model";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

type UserData = Omit<LoginResponseSchema, 'token'> | null;

interface AuthState {
  loading: boolean;
  error: string | null;
  success: boolean;
  token: string | null;
  user: UserData;
}


const initialState: AuthState = {
  loading: false,
  error: null,
  success: false,
  token: null,
  user: null,
};

export const loginUser = createAsyncThunk<
  { token: string; user: UserData },
  any,
  { rejectValue: string }
>(
  'auth/loginUser',
  async (userData, { rejectWithValue }) => {
    try {
      const response = await axiosClient.post<LoginResponseSchema>('/user/login', userData);
      const { token, ...user } = response.data;
      localStorage.setItem('token', token);
      localStorage.setItem('user', JSON.stringify(user));

      return { token, user };
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'An error occurred');
    }
  }
);


const loginSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.token = null;
      state.user = null;
    },
    initializeAuthState: (state) => {
      const token = localStorage.getItem('token');
      const userString = localStorage.getItem('user');
    
      if (token && userString) {
        try {
          const user = JSON.parse(userString);
          state.token = token;
          state.user = {
            ...user,
            country: user.country || '', // Ensure `country` exists
          };
        } catch (error) {
          console.error('Failed to parse user data:', error);
          localStorage.removeItem('token');
          localStorage.removeItem('user');
        }
      } else {
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      }
    },
    
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.token = action.payload.token;
        state.user = action.payload.user;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload as string || 'Failed to login';
      });
  },
});

export const { resetState, initializeAuthState } = loginSlice.actions;
export default loginSlice.reducer;