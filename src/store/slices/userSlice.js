import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  id: null,
  name: '',
  avatar: '',
  role: 'user', // 'user' | 'admin'
  locale: 'ru',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, { payload }) {
      Object.assign(state, payload);
    },
    clearUser() {
      return initialState;
    },
    setRole(state, { payload }) {
      state.role = payload;
    },
    setLocale(state, { payload }) {
      state.locale = payload;
    },
  },
});

export const { setUser, clearUser, setRole, setLocale } = userSlice.actions;

export const selectUser = (s) => s.user;
export const selectUserRole = (s) => s.user.role;
export const selectUserLocale = (s) => s.user.locale;

export default userSlice.reducer;
