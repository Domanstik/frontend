import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: 'Петрова Екатерина',
  stars: 58,
  avatar: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) { return { ...state, ...action.payload }; },
    setStars(state, action) { state.stars = action.payload; },
  }
});

export const { setUser, setStars } = userSlice.actions;
export const selectUser = (s) => s.user;
export default userSlice.reducer;
