import { createSlice } from '@reduxjs/toolkit';

const THEME_KEY = 'app_theme';

function readTheme() {
  try {
    const t = localStorage.getItem(THEME_KEY);
    return t === 'dark' || t === 'light' ? t : 'light';
  } catch {
    return 'light';
  }
}
function saveTheme(t) {
  try {
    localStorage.setItem(THEME_KEY, t);
  } catch {
    /* noop */
  }
}

const initialState = {
  header: {
    title: '',
    avatar: '',
    right: null,
  },
  theme: readTheme(), // 'light' | 'dark'
};

const slice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setHeader(state, { payload }) {
      state.header = { ...state.header, ...payload };
    },
    setTheme(state, { payload }) {
      if (payload === 'light' || payload === 'dark') {
        state.theme = payload;
        saveTheme(state.theme);
      }
    },
    toggleTheme(state) {
      state.theme = state.theme === 'dark' ? 'light' : 'dark';
      saveTheme(state.theme);
    },
  },
});

export const { setHeader, setTheme, toggleTheme } = slice.actions;

export const selectHeader = (s) => s.ui.header;
export const selectTheme = (s) => s.ui.theme;

export default slice.reducer;
