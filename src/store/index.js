import { configureStore } from '@reduxjs/toolkit';
import ui from './slices/uiSlice';
import user from './slices/userSlice';
import shop from './slices/shopSlice';       // ← добавили
import surveys from './slices/surveysSlice'; // ← добавили

const store = configureStore({
  reducer: { ui, user, shop, surveys },
  devTools: process.env.NODE_ENV !== 'production',
  // если потребуется хранить несериализуемые сущности — раскомментим:
  // middleware: (getDefault) => getDefault({
  //   serializableCheck: false,
  // }),
});

export default store;
