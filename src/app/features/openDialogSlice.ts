// features/dialogSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface DialogState {
  isDialogOpen: boolean;
}

const initialState: DialogState = {
  isDialogOpen: false,
};

const dialogSlice = createSlice({
  name: 'dialog',
  initialState,
  reducers: {
    setIsDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isDialogOpen = action.payload;
    },
    toggleDialog: (state) => {
      state.isDialogOpen = !state.isDialogOpen;
    },
  },
});

export const { setIsDialogOpen, toggleDialog } = dialogSlice.actions;
export default dialogSlice.reducer;