import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  theme: 'light', // 'light' | 'dark'
  header: { title: '', avatar: '', right: null },
  navHidden: false, // скрыть нижнюю навигацию (для admin/шитов)
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setTheme(state, { payload }) {
      state.theme = payload;
    },
    toggleTheme(state) {
      state.theme = state.theme === 'light' ? 'dark' : 'light';
    },
    setHeader(state, { payload }) {
      state.header = { ...state.header, ...payload };
    },
    resetHeader(state) {
      state.header = initialState.header;
    },
    setNavHidden(state, { payload }) {
      state.navHidden = !!payload;
    },
  },
});

export const { setTheme, toggleTheme, setHeader, resetHeader, setNavHidden } =
  uiSlice.actions;

export const selectTheme = (s) => s.ui.theme;
export const selectHeader = (s) => s.ui.header;
export const selectNavHidden = (s) => s.ui.navHidden;

export default uiSlice.reducer;
