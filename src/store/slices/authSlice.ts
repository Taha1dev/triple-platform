/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import axiosClient from '@/api/apiClient';
import { setUser, clearUser } from './userSlice';

interface AuthState {
  loading: boolean;
  error: string | null;
  isAuthenticated: boolean;
  loginToken: string;
  fcmToken: string;
}

// Load initial state from localStorage if available
const loadAuthState = (): AuthState => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('authState');
    return saved ? JSON.parse(saved) : {
      loading: false,
      error: null,
      isAuthenticated: false,
      loginToken: '',
      fcmToken: '',
    };
  }
  return {
    loading: false,
    error: null,
    isAuthenticated: false,
    loginToken: '',
    fcmToken: '',
  };
};

const authSlice = createSlice({
  name: 'auth',
  initialState: loadAuthState(),
  reducers: {
    login(state, action) {
      const newState = {
        ...state,
        isAuthenticated: true,
        loginToken: action.payload.loginToken,
        fcmToken: action.payload.fcmToken || state.fcmToken,
      };
      if (typeof window !== 'undefined') {
        localStorage.setItem('authState', JSON.stringify(newState));
      }
      return newState;
    },
    // This will be called after the async logout completes
    logoutSuccess(state) {
      const newState = {
        ...state,
        isAuthenticated: false,
        loginToken: '',
        fcmToken: '',
        loading: false,
        error: null,
      };
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authState');
        localStorage.removeItem('userState');
      }
      return newState;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(loginUser.pending, (state) => {
        const newState = { ...state, loading: true, error: null };
        if (typeof window !== 'undefined') {
          localStorage.setItem('authState', JSON.stringify(newState));
        }
        return newState;
      })
      .addCase(loginUser.fulfilled, (state) => {
        const newState = { ...state, loading: false };
        if (typeof window !== 'undefined') {
          localStorage.setItem('authState', JSON.stringify(newState));
        }
        return newState;
      })
      .addCase(loginUser.rejected, (state, action) => {
        const newState = {
          ...state,
          loading: false,
          error: action.payload || 'Failed to login',
        };
        if (typeof window !== 'undefined') {
          localStorage.setItem('authState', JSON.stringify(newState));
        }
        return newState;
      })
      .addCase(logoutUser.pending, (state) => {
        return { ...state, loading: true, error: null };
      })
      .addCase(logoutUser.fulfilled, (state) => {
        const newState = {
          ...state,
          isAuthenticated: false,
          loginToken: '',
          fcmToken: '',
          loading: false,
          error: null,
        };
        if (typeof window !== 'undefined') {
          localStorage.removeItem('authState');
          localStorage.removeItem('userState');
        }
        return newState;
      })

  },
});

export const loginUser = createAsyncThunk<
  void,
  { email: string; password: string },
  { rejectValue: string }
>(
  'auth/loginUser',
  async (credentials, { dispatch, rejectWithValue }) => {
    try {
      const response = await axiosClient.post('/user/login', credentials);
      const { login_token, ...userData } = response as any;
      dispatch(setUser({ ...userData, loginToken: login_token }));
      dispatch(login({ loginToken: login_token }));
      return response.data;
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Login failed');
    }
  }
);

export const logoutUser = createAsyncThunk(
  'auth/logoutUser',
  async (_, { dispatch, rejectWithValue }) => {
    try {
      // Make logout API call
      await axiosClient.post('/user/logout');

      // Clear user data from state and localStorage
      dispatch(clearUser());
      dispatch(logoutSuccess());

      // Clear all auth-related localStorage items
      if (typeof window !== 'undefined') {
        localStorage.removeItem('authState');
        localStorage.removeItem('userState');
      }
    } catch (error: any) {
      return rejectWithValue(error?.response?.data?.message || 'Logout failed');
    }
  }
);

export const { login, logoutSuccess } = authSlice.actions;
export default authSlice.reducer;