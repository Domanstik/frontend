import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'merch',
  initialState: { items: [] },
  reducers: {
    setMerch(state, action) {
      state.items = action.payload || [];
    },
    upsertMerch(state, action) {
      const item = action.payload;
      const i = state.items.findIndex((x) => x.id === item.id);
      if (i >= 0) state.items[i] = item;
      else state.items.push(item);
    },
    removeMerch(state, action) {
      state.items = state.items.filter((x) => x.id !== action.payload);
    },
  },
});
export const { setMerch, upsertMerch, removeMerch } = slice.actions;
export const selectMerch = (s) => s.merch.items;
export default slice.reducer;
