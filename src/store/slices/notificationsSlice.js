import { createSlice } from '@reduxjs/toolkit';

const slice = createSlice({
  name: 'notifications',
  initialState: { items: [] },
  reducers: {
    setNotifications(state, action) {
      state.items = action.payload || [];
    },
    addNotification(state, action) {
      state.items.unshift(action.payload);
    },
    clearNotifications(state) {
      state.items = [];
    },
  },
});
export const { setNotifications, addNotification, clearNotifications } = slice.actions;
export const selectNotifications = (s) => s.notifications.items;
export default slice.reducer;
