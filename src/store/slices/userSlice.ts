/* eslint-disable @typescript-eslint/no-explicit-any */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export interface Category {
  _id: string;
  name: string;
  icon: string;
  slug: string;
}

export interface SubCategory {
  _id: string;
  type: string;
  name: string;
}

export interface ProfileMedia {
  url: string;
  alt: string;
  key: string;
  mimetype: string;
  description: string;
}

export interface ProfileImage {
  url: string;
  alt: string;
  key: string;
  mimetype: string;
  description: string;
}

export interface Profile {
  _id: string;
  facialFeatures: any[];
  tattoo: any[];
  piercing: any[];
  scars: any[];
  user: string;
  portfolioMedia: ProfileMedia[];
  languagesSpoken: any[];
  profileImage: ProfileImage;
}

export interface UserState {
  _id: string;
  fname: string;
  lname: string;
  bio: string;
  email: string;
  contact_number: string;
  dob: string;
  createdAt: string;
  city: string[];
  country: string;
  rating: number;
  portfolio: any[];
  categories: Category[];
  subCategories: SubCategory[];
  profile: Profile | null;
}

const loadUserState = (): UserState => {
  if (typeof window !== 'undefined') {
    const saved = localStorage.getItem('userState');
    return saved ? JSON.parse(saved) : {
      _id: '',
      fname: '',
      lname: '',
      email: '',
      contact_number: '',
      dob: '',
      bio: "",
      createdAt: '',
      city: [],
      country: '',
      rating: 0,
      portfolio: [],
      categories: [],
      subCategories: [],
      profile: null,
    };
  }
  return {
    _id: '',
    fname: '',
    lname: '',
    email: '',
    contact_number: '',
    dob: '',
    bio: "",
    createdAt: '',
    city: [],
    country: '',
    rating: 0,
    portfolio: [],
    categories: [],
    subCategories: [],
    profile: null,
  };
};

const userSlice = createSlice({
  name: 'user',
  initialState: loadUserState(),
  reducers: {
    setUser(state, action: PayloadAction<UserState>) {
      const newState = { ...state, ...action.payload };
      if (typeof window !== 'undefined') {
        localStorage.setItem('userState', JSON.stringify(newState));
      }
      return newState;
    },
    updateUser(state, action: PayloadAction<Partial<UserState>>) {
      const newState = { ...state, ...action.payload };
      if (typeof window !== 'undefined') {
        localStorage.setItem('userState', JSON.stringify(newState));
      }
      return newState;
    },
    clearUser() {
      if (typeof window !== 'undefined') {
        localStorage.removeItem('userState');
      }
      return {
        _id: '',
        fname: '',
        lname: '',
        email: '',
        contact_number: '',
        dob: '',
        bio: "",
        createdAt: '',
        city: [],
        country: '',
        rating: 0,
        portfolio: [],
        categories: [],
        subCategories: [],
        profile: null,
      };
    },
  },
});

export const { setUser, updateUser, clearUser } = userSlice.actions;
export default userSlice.reducer;