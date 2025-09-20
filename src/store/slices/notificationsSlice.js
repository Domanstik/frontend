import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  items: [], // [{id,title,date,read:false}]
  unread: 0,
};

const recalcUnread = (state) => {
  state.unread = state.items.reduce((acc, it) => acc + (it.read ? 0 : 1), 0);
};

const notificationsSlice = createSlice({
  name: 'notifications',
  initialState,
  reducers: {
    setNotifications(state, { payload }) {
      state.items = Array.isArray(payload)
        ? payload.map((it) => ({ read: false, ...it }))
        : [];
      recalcUnread(state);
    },
    addNotification(state, { payload }) {
      state.items.unshift({ read: false, ...payload });
      recalcUnread(state);
    },
    removeNotification(state, { payload: id }) {
      state.items = state.items.filter((n) => n.id !== id);
      recalcUnread(state);
    },
    markRead(state, { payload: id }) {
      state.items = state.items.map((n) => (n.id === id ? { ...n, read: true } : n));
      recalcUnread(state);
    },
    markAllRead(state) {
      state.items = state.items.map((n) => ({ ...n, read: true }));
      state.unread = 0;
    },
  },
});

export const {
  setNotifications,
  addNotification,
  removeNotification,
  markRead,
  markAllRead,
} = notificationsSlice.actions;

export const selectNotifications = (s) => s.notifications.items;
export const selectUnreadCount = (s) => s.notifications.unread;

export default notificationsSlice.reducer;
