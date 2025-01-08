import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface routerState {
  path: string,
}

const initialState: routerState = {
  path: '',
};

const routerSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    setPath: (state, action: PayloadAction<string>) => {
      state.path = action.payload;
    },

  },
});

export const { setPath } = routerSlice.actions;
export default routerSlice.reducer;