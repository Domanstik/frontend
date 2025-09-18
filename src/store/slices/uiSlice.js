import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  header: { title: '', avatar: '', right: null },
  theme: 'auto', // 'auto' | 'light' | 'dark'
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setHeader(state, action) {
      state.header = { ...state.header, ...action.payload };
    },
    setTheme(state, action) {
      state.theme = action.payload;
    },
    applyTheme(state, action) {},
  },
});

export const { setHeader, setTheme, applyTheme } = uiSlice.actions;
export const selectHeader = (s) => s.ui.header;
export const selectTheme = (s) => s.ui.theme;
export default uiSlice.reducer;
