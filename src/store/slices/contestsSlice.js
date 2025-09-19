import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'contests',
  initialState: { list: [], current: null },
  reducers: {
    setContests(state, action) {
      state.list = action.payload || [];
    },
    setCurrentContest(state, action) {
      state.current = action.payload || null;
    },
  },
});
export const { setContests, setCurrentContest } = slice.actions;
export const selectContests = (s) => s.contests.list;
export const selectCurrentContest = (s) => s.contests.current;
export default slice.reducer;
