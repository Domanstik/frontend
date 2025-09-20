import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { apiLoginInternal } from '@/api/internalApi';
import { tokenVault } from '@/api/tokenVault';

const initialState = {
  role: null, // 'Admin' | 'Employee' | null
  user: null, // { tgId, username } | null
  isAuthenticated: false,
  status: 'idle',
  error: null,
};

export const loginInternalDev = createAsyncThunk(
  'auth/loginInternalDev',
  async (
    { TgId, Username, Phone, Role = 'Employee', Language = 'ru' },
    { rejectWithValue },
  ) => {
    try {
      const res = await apiLoginInternal({ TgId, Username, Phone, Role, Language });
      return res; // { token, expiresAt }
    } catch (e) {
      return rejectWithValue(e.message || 'Login failed');
    }
  },
);

const slice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    hydrateFromVault(state) {
      const t = tokenVault.getInternal();
      if (!t) {
        state.role = null;
        state.user = null;
        state.isAuthenticated = false;
        return;
      }
      state.role = tokenVault.getRoleFrom(t);
      state.user = tokenVault.getIdentityFrom(t);
      state.isAuthenticated = true;
    },
    logout(state) {
      tokenVault.clearInternal();
      state.role = null;
      state.user = null;
      state.isAuthenticated = false;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (b) => {
    b.addCase(loginInternalDev.pending, (s) => {
      s.status = 'loading';
      s.error = null;
    });
    b.addCase(loginInternalDev.fulfilled, (s, { payload }) => {
      s.status = 'succeeded';
      tokenVault.setInternal(payload.token);
      s.role = tokenVault.getRoleFrom(payload.token);
      s.user = tokenVault.getIdentityFrom(payload.token);
      s.isAuthenticated = true;
    });
    b.addCase(loginInternalDev.rejected, (s, { payload }) => {
      s.status = 'failed';
      s.error = payload || 'Login failed';
    });
  },
});

export const { hydrateFromVault, logout } = slice.actions;

export const selectIsAdmin = (s) => s.auth.role === 'Admin';
export const selectAuthUser = (s) => s.auth.user;
export const selectAuthStatus = (s) => s.auth.status;

export default slice.reducer;
