import { createSlice } from '@reduxjs/toolkit';
const initialState = { role: 'user', isAdmin: false };

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setRole(state, action) {
      state.role = action.payload;
      state.isAdmin = action.payload === 'admin';
    },
    setIsAdmin(state, action) {
      state.isAdmin = !!action.payload;
      state.role = action.payload ? 'admin' : 'user';
    },
  },
});
export const { setRole, setIsAdmin } = authSlice.actions;
export const selectIsAdmin = (s) => s.auth.isAdmin;
export default authSlice.reducer;
