import { configureStore } from '@reduxjs/toolkit';
import ui from './slices/uiSlice';
import user from './slices/userSlice';

const store = configureStore({
  reducer: { ui, user },
  devTools: process.env.NODE_ENV !== 'production',
});
export default store;
