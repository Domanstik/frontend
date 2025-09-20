import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  list: [], // [{id, title, subtitle, starsJoin, starsWin, period, locale, lang}]
  selectedId: null, // для открытой карточки/деталей
  winnersByContest: {}, // { [contestId]: [{ userId, name, rank }...] }
};

const contestsSlice = createSlice({
  name: 'contests',
  initialState,
  reducers: {
    setContests(state, { payload }) {
      state.list = Array.isArray(payload) ? payload : [];
    },
    addContest(state, { payload }) {
      state.list.unshift(payload);
    },
    updateContest(state, { payload }) {
      if (!payload?.id) return;
      state.list = state.list.map((c) =>
        c.id === payload.id ? { ...c, ...payload } : c,
      );
    },
    removeContest(state, { payload: id }) {
      state.list = state.list.filter((c) => c.id !== id);
      if (state.selectedId === id) state.selectedId = null;
      delete state.winnersByContest[id];
    },
    setSelectedContest(state, { payload: id }) {
      state.selectedId = id ?? null;
    },
    setWinners(state, { payload }) {
      const { contestId, winners } = payload || {};
      if (!contestId) return;
      state.winnersByContest[contestId] = winners || [];
    },
  },
});

export const {
  setContests,
  addContest,
  updateContest,
  removeContest,
  setSelectedContest,
  setWinners,
} = contestsSlice.actions;

export const selectContests = (s) => s.contests.list;
export const selectContestById = (id) => (s) => s.contests.list.find((c) => c.id === id);
export const selectSelectedContest = (s) =>
  s.contests.list.find((c) => c.id === s.contests.selectedId) || null;

export default contestsSlice.reducer;
