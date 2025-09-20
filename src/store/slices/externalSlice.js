import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import {
  extRegister,
  extLogin,
  extEnsureSession,
  extGetProfile,
  extGetRating,
  extGetTransactions,
  extUpdateUser,
} from '@/api/externalApi';
import { tokenVault } from '@/api/tokenVault';

const initialState = {
  hasAuthJwt: !!tokenVault.getExtAuth(),
  hasSession: !!tokenVault.getExtSession(),
  profile: null, // { fio, balance }
  rating: [], // [{ fio, balance, place }]
  transactions: [], // [{ date, amount, type?, descr }]
  status: 'idle',
  error: null,
};

export const rpcRegister = createAsyncThunk(
  'external/register',
  async ({ pin, tg_id, phone, username }, { rejectWithValue }) => {
    try {
      return await extRegister({ pin, tg_id, phone, username });
    } catch (e) {
      return rejectWithValue(e.message || 'Register failed');
    }
  },
);

export const rpcLogin = createAsyncThunk(
  'external/login',
  async (_, { rejectWithValue }) => {
    try {
      return await extLogin();
    } catch (e) {
      return rejectWithValue(e.message || 'Login failed');
    }
  },
);

export const rpcEnsureSession = createAsyncThunk('external/ensureSession', async () => {
  await extEnsureSession();
  return { ok: true };
});

export const fetchProfile = createAsyncThunk(
  'external/fetchProfile',
  async (_, { rejectWithValue }) => {
    try {
      return await extGetProfile();
    } catch (e) {
      return rejectWithValue(e.message || 'Profile failed');
    }
  },
);

export const fetchRating = createAsyncThunk(
  'external/fetchRating',
  async (_, { rejectWithValue }) => {
    try {
      return await extGetRating();
    } catch (e) {
      return rejectWithValue(e.message || 'Rating failed');
    }
  },
);

export const fetchTransactions = createAsyncThunk(
  'external/fetchTransactions',
  async (_, { rejectWithValue }) => {
    try {
      return await extGetTransactions();
    } catch (e) {
      return rejectWithValue(e.message || 'Transactions failed');
    }
  },
);

export const updateUserInfo = createAsyncThunk(
  'external/updateUser',
  async (payload, { rejectWithValue }) => {
    try {
      return await extUpdateUser(payload);
    } catch (e) {
      return rejectWithValue(e.message || 'Update failed');
    }
  },
);

const slice = createSlice({
  name: 'external',
  initialState,
  reducers: {
    hydrateFromVault(state) {
      state.hasAuthJwt = !!tokenVault.getExtAuth();
      state.hasSession = !!tokenVault.getExtSession();
    },
    dropExternal(state) {
      tokenVault.setExtSession(null);
      state.hasSession = false;
    },
  },
  extraReducers: (b) => {
    b.addCase(rpcRegister.fulfilled, (s, { payload }) => {
      s.hasAuthJwt = !!(payload && payload.auth_jwt);
    });
    b.addCase(rpcLogin.fulfilled, (s) => {
      s.hasSession = true;
    });
    b.addCase(rpcEnsureSession.fulfilled, (s) => {
      s.hasSession = true;
    });

    b.addCase(fetchProfile.pending, (s) => {
      s.status = 'loading';
      s.error = null;
    });
    b.addCase(fetchProfile.fulfilled, (s, { payload }) => {
      s.status = 'succeeded';
      s.profile = payload || null;
    });
    b.addCase(fetchProfile.rejected, (s, { payload }) => {
      s.status = 'failed';
      s.error = payload || 'Profile failed';
    });

    b.addCase(fetchRating.fulfilled, (s, { payload }) => {
      s.rating = Array.isArray(payload) ? payload : [];
    });
    b.addCase(fetchTransactions.fulfilled, (s, { payload }) => {
      s.transactions = Array.isArray(payload) ? payload : [];
    });
  },
});

export const { hydrateFromVault: hydrateExternalFromVault, dropExternal } = slice.actions;

export const selectProfile = (s) => s.external.profile;
export const selectBalance = (s) => s.external.profile?.balance ?? 0;
export const selectRating = (s) => s.external.rating;
export const selectHasSession = (s) => s.external.hasSession;

export default slice.reducer;
