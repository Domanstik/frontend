import { createSlice } from '@reduxjs/toolkit';

const THEME_KEY = 'app.theme';

const initialTheme = (() => {
  const saved = localStorage.getItem(THEME_KEY);
  return saved === 'light' || saved === 'dark' ? saved : 'light';
})();

const initialState = {
  header: { title: '', avatar: '', right: null },
  theme: initialTheme, // 'light' | 'dark'
};

const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setHeader(state, { payload }) {
      state.header = { ...state.header, ...payload };
    },
    setTheme(state, { payload }) {
      state.theme = payload === 'dark' ? 'dark' : 'light';
      localStorage.setItem(THEME_KEY, state.theme);
    },
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      localStorage.setItem(THEME_KEY, state.theme);
    },
  },
});

export const { setHeader, setTheme, toggleTheme } = slice.actions;

export const selectHeader = (s) => s.ui.header;
export const selectTheme = (s) => s.ui.theme;

export default slice.reducer;
