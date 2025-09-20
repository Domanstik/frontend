import { createSlice } from '@reduxjs/toolkit';

/**
 * Слайс магазина:
 * - products: массив товаров (минимум { id, title, price, ... })
 * - favorites: словарь { [productId]: true } для быстрых проверок
 */
const initialState = {
  products: [],
  favorites: {}, // { [id]: true }
};

const shopSlice = createSlice({
  name: 'shop',
  initialState,
  reducers: {
    /** Полностью заменить список товаров (например, после загрузки) */
    setProducts(state, { payload }) {
      state.products = Array.isArray(payload) ? payload : [];
    },
    /** Тоггл фаворита по id */
    toggleFavorite(state, { payload: id }) {
      if (!id) return;
      if (state.favorites[id]) {
        delete state.favorites[id];
      } else {
        state.favorites[id] = true;
      }
    },
    /** Явно установить флаг избранного */
    setFavorite(state, { payload }) {
      const { id, value } = payload || {};
      if (!id) return;
      if (value) state.favorites[id] = true;
      else delete state.favorites[id];
    },
    /** Очистить все фавориты */
    clearFavorites(state) {
      state.favorites = {};
    },
  },
});

export const { setProducts, toggleFavorite, setFavorite, clearFavorites } =
  shopSlice.actions;

/* ================== Selectors ================== */
const selectShop = (state) => state.shop;

/** Все товары */
export const selectProducts = (state) => selectShop(state).products;

/** Товар по id */
export const selectProductById = (id) => (state) =>
  selectShop(state).products.find((p) => p?.id === id);

/** Массив id избранных товаров */
export const selectFavIds = (state) => Object.keys(selectShop(state).favorites);

/** Массив объектов избранных товаров */
export const selectFavorites = (state) => {
  const fav = selectShop(state).favorites;
  const list = selectShop(state).products;
  return list.filter((p) => fav[p?.id]);
};

/** Кол-во избранных */
export const selectFavCount = (state) => selectFavIds(state).length;

/**
 * НУЖНЫЙ СЕЛЕКТОР: true, если товар в избранном
 * Использование:
 *   const isFav = useSelector(selectIsFav(productId));
 */
export const selectIsFav = (id) => (state) => !!selectShop(state).favorites[id];

export default shopSlice.reducer;
