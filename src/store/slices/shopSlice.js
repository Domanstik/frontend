import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favorites: {}, // { [productId]: true }
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    toggleFavorite(state, action) {
      const id = String(action.payload);
      state.favorites[id] = !state.favorites[id];
    },
    setFavorite(state, action) {
      const { id, value } = action.payload;
      state.favorites[String(id)] = !!value;
    },
    resetFavorites(state) {
      state.favorites = {};
    },
  },
});

export const { toggleFavorite, setFavorite, resetFavorites } = shopSlice.actions;
export const selectIsFav = (id) => (s) => !!s.shop.favorites[String(id)];
export default shopSlice.reducer;
