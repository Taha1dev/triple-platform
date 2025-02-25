import { createSlice } from '@reduxjs/toolkit'

interface HeaderState {
  isHeaderShow: boolean
}

const initialState: HeaderState = {
  isHeaderShow: true,
}

const headerSlice = createSlice({
  name: 'headerShow',
  initialState,
  reducers: {
    hideHeader: state => {
      state.isHeaderShow = false
    },
    showHeader: state => {
      state.isHeaderShow = false
    },
  },
})

export const { hideHeader, showHeader } = headerSlice.actions
export default headerSlice.reducer
