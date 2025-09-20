import { configureStore } from '@reduxjs/toolkit';

// существующие
import ui from './slices/uiSlice';
import user from './slices/userSlice';
import shop from './slices/shopSlice';
import merch from './slices/merchSlice';
import contests from './slices/contestsSlice';
import surveys from './slices/surveysSlice';
import notifications from './slices/notificationsSlice';

// новые / обновлённые
import auth from './slices/authSlice';
import external from './slices/externalSlice';

const store = configureStore({
  reducer: {
    ui, user, shop, merch, contests, surveys, notifications,
    auth, external,
  },
  devTools: import.meta.env.MODE !== 'production',
});

export default store;
