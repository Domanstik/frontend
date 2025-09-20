import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // [{id,title,price,description,image,liked}]
};

const merchSlice = createSlice({
  name: 'merch',
  initialState,
  reducers: {
    setMerch(state, { payload }) {
      state.items = Array.isArray(payload) ? payload : [];
    },
    addMerch(state, { payload }) {
      state.items.unshift(payload);
    },
    updateMerch(state, { payload }) {
      if (!payload?.id) return;
      state.items = state.items.map((it) =>
        it.id === payload.id ? { ...it, ...payload } : it,
      );
    },
    removeMerch(state, { payload: id }) {
      state.items = state.items.filter((it) => it.id !== id);
    },
  },
});

export const { setMerch, addMerch, updateMerch, removeMerch } = merchSlice.actions;

export const selectMerch = (s) => s.merch.items;

export default merchSlice.reducer;
