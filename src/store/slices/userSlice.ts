/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface UserData {
  id: string;
  fname: string;
  lname: string;
  email: string;
  rating: number;
  data: any[];
  image: string;
  bio: string;
  portfolio: any[];
  city: string[];
  country: string;
  contact_number: string;
  dob: string;
  token: string;
}

interface UserState {
  user: UserData | null;
}

const initialState: UserState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserData>) => {
      state.user = action.payload;
      localStorage.setItem("user", JSON.stringify(action.payload));
      action.payload.token &&
        localStorage.setItem("token", action.payload.token);
    },
    clearUser: (state) => {
      state.user = null;
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    },
    initializeUserData: (state) => {
      const userString = localStorage.getItem("user");
      const token = localStorage.getItem("token");

      if (userString && token) {
        try {
          const user = JSON.parse(userString);
          state.user = { ...user, token };
        } catch (error) {
          console.error("Failed to parse user data:", error);
          localStorage.removeItem("user");
          localStorage.removeItem("token");
        }
      }
    },
  },
});

export const { setUser, clearUser, initializeUserData } = userSlice.actions;
export default userSlice.reducer;
