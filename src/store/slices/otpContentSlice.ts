import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface otpContentState {
  title: string;
  sub: string;
}

const initialState: otpContentState = {
  title: '',
  sub: '',
};

const otpContentSlice = createSlice({
  name: 'otpContent',
  initialState,
  reducers: {
    setTitle: (state, action: PayloadAction<string>) => {
      state.title = action.payload;
    },
    setSub: (state, action: PayloadAction<string>) => {
      state.sub = action.payload;
    },
  },
});

export const { setSub, setTitle } = otpContentSlice.actions;
export default otpContentSlice.reducer;